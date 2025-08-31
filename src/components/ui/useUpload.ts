"use client"
import { useState } from "react";
import { type PutBlobResult, BlobError } from "@vercel/blob";
import { upload as vercelUpload } from "@vercel/blob/client";


//Types
type UseUploadOptions = {
    onError?: (error: { message: string }) => void;
};
export type UseUploadResponse = {
    blob: PutBlobResult | null;
}

export const useUpload = (options?: UseUploadOptions) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string>("");

    const upload = async (file: File | Blob | undefined | null): Promise<UseUploadResponse> => {
        if (!file) return {
            blob: null
        }
        try {
            setIsUploading(true);
            setIsSuccess(false);
            const extension = file instanceof File && file.name.includes(".")
                ? file.name.split(".").pop()
                : "pdf";

            const newBlob = await vercelUpload(`${crypto.randomUUID()}.${extension}`, file, {
                access: "public",
                handleUploadUrl: "/api/blob"
            })
            return {
                blob: newBlob
            };
        } catch (error) {
            if (error instanceof BlobError) {
                const message = error?.message || "Something went wrong on file uploading"
                options?.onError?.({ message });
                setError(message);
            } else {
                const message = "Something went wrong on file uploading"
                options?.onError?.({ message });
                setError(message);
            }
            return {
                blob: null
            }
        } finally {
            setIsUploading(false);
            setIsSuccess(true);
        }
    };

    return { isUploading, upload, isSuccess, error };
};