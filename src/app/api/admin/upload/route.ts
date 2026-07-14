import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { verifyAdminSession } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          error: "Supabase is not configured.",
        },
        {
          status: 500,
        }
      );
    }

   const cookieStore = await cookies();

console.log(
  "ADMIN COOKIES:",
  cookieStore.getAll()
);

const token =
  cookieStore.get("admin_session")?.value ?? "";

console.log(
  "ADMIN TOKEN EXISTS:",
  Boolean(token)
);

if (!token) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const session =
      await verifyAdminSession(token);

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type",
        },
        {
          status: 400,
        }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File too large",
        },
        {
          status: 400,
        }
      );
    }

    const extension =
      file.name.split(".").pop()?.toLowerCase() ??
      "png";

    const fileName = `service-${Date.now()}-${randomUUID()}.${extension}`;

    const arrayBuffer =
      await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const { error } =
      await supabaseAdmin.storage
        .from("service-images")
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

if (error) {
  console.error("STORAGE UPLOAD ERROR:", error);

  return NextResponse.json(
    {
      error: error.message,
    },
    {
      status: 500,
    }
  );
}

    const { data } =
      supabaseAdmin.storage
        .from("service-images")
        .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: data.publicUrl,
      fileName,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}