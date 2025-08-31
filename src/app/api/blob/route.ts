import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const body = (await req.json()) as HandleUploadBody;
    try {
        const jsonResponse = await handleUpload({
            body,
            request: req,
            onBeforeGenerateToken: async () => {
                return {
                    addRandomSuffix: true
                };
            },
            onUploadCompleted: async () => { },
        });
        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 },
        );
    }
};