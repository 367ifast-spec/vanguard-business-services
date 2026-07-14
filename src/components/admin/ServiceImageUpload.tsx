"use client";

import { useRef, useState, ChangeEvent } from "react";

export default function ServiceImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function onSelectFile(
    e: ChangeEvent<HTMLInputElement>
  ) {
    setError("");
    setSuccess("");

    const selected = e.target.files?.[0];

    if (!selected) {
      return;
    }

    if (!selected.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("Maximum image size is 5MB.");
      return;
    }

    setFile(selected);

    const objectUrl = URL.createObjectURL(selected);

    setPreview(objectUrl);
  }

  async function uploadImage() {
    if (!file) {
      setError("Please select an image.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/admin/upload",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Upload failed."
        );
      }

      setImageUrl(data.url);

      setSuccess("Image uploaded successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-5">

      <input
        ref={inputRef}
        type="hidden"
        name="image_url"
        value={imageUrl}
        readOnly
      />

      <div>

        <label className="mb-2 block font-semibold text-slate-700">
          Service Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full rounded-xl border border-slate-300 px-4 py-3"
        />

      </div>

      {preview && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">

          <img
            src={preview}
            alt="Preview"
            className="h-56 rounded-xl object-cover"
          />

        </div>
      )}
            <div className="flex flex-wrap items-center gap-4">

        <button
          type="button"
          onClick={uploadImage}
          disabled={uploading || !file}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        {imageUrl && (
          <span className="rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
            ✓ Upload Complete
          </span>
        )}

      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
          {success}
        </div>
      )}

     
    </div>
  );
}