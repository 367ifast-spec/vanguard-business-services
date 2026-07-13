type Entry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, Entry>();

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

export function rateLimit(
  key: string,
  limit = 10,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();

  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;

    store.set(key, {
      count: 1,
      resetAt,
    });

    return {
      success: true,
      remaining: limit - 1,
      resetAt,
    };
  }

  if (current.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: current.resetAt,
    };
  }

  current.count++;

  return {
    success: true,
    remaining: limit - current.count,
    resetAt: current.resetAt,
  };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return headers.get("x-real-ip") ?? "unknown";
}

setInterval(() => {
  const now = Date.now();

  for (const [key, value] of store.entries()) {
    if (value.resetAt <= now) {
      store.delete(key);
    }
  }
}, 60_000);
