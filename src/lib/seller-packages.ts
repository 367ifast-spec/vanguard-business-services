export const SELLER_PACKAGES = {
  FREE: {
    name: "FREE",
    price: 0,
    listingLimit: 15,
    isUnlimited: false,
  },

  VERIFIED: {
    name: "VERIFIED",
    price: 10,
    listingLimit: 50,
    isUnlimited: false,
  },

  BRONZE: {
    name: "BRONZE",
    price: 20,
    listingLimit: 100,
    isUnlimited: false,
  },

  SILVER: {
    name: "SILVER",
    price: 35,
    listingLimit: 250,
    isUnlimited: false,
  },

  GOLD: {
    name: "GOLD",
    price: 50,
    listingLimit: 500,
    isUnlimited: false,
  },

  PLATINUM: {
    name: "PLATINUM",
    price: 75,
    listingLimit: 1000,
    isUnlimited: false,
  },

  DIAMOND: {
    name: "DIAMOND",
    price: 100,
    listingLimit: Infinity,
    isUnlimited: true,
  },
} as const;

export type SellerPackageName =
  keyof typeof SELLER_PACKAGES;

export function getListingLimit(
  packageName: string
): number {
  const pkg =
    SELLER_PACKAGES[
      packageName.toUpperCase() as SellerPackageName
    ];

  return pkg?.listingLimit ?? 15;
}

export function isUnlimitedPackage(
  packageName: string
): boolean {
  const pkg =
    SELLER_PACKAGES[
      packageName.toUpperCase() as SellerPackageName
    ];

  return pkg?.isUnlimited ?? false;
}

export function getPackagePrice(
  packageName: string
): number {
  const pkg =
    SELLER_PACKAGES[
      packageName.toUpperCase() as SellerPackageName
    ];

  return pkg?.price ?? 0;
}

export function canCreateListing(
  packageName: string,
  currentListings: number
): boolean {
  const limit = getListingLimit(packageName);

  if (limit === Infinity) {
    return true;
  }

  return currentListings < limit;
}

export function getRemainingListings(
  packageName: string,
  currentListings: number
): number | "Unlimited" {
  const limit = getListingLimit(packageName);

  if (limit === Infinity) {
    return "Unlimited";
  }

  return Math.max(limit - currentListings, 0);
}

export const PACKAGE_ORDER = [
  "FREE",
  "VERIFIED",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "DIAMOND",
] as const;