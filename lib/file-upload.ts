import { put } from "@vercel/blob"
import { NextResponse } from 'next/server';

export async function uploadFile(file: File): Promise<{ url: string }> {
  try {
    // Generate a unique filename to avoid collisions
    const uniqueFilename = `${Date.now()}-${file.name}`

    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: "public",
    })

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Error uploading file:", error)
    throw new Error("File upload failed")
  }
}
