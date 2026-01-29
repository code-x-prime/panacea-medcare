import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

export const isR2Configured = !!(
    R2_ACCOUNT_ID &&
    R2_ACCESS_KEY_ID &&
    R2_SECRET_ACCESS_KEY &&
    R2_BUCKET_NAME &&
    R2_PUBLIC_URL
);

let r2Client = null;
if (isR2Configured) {
    r2Client = new S3Client({
        region: "auto",
        endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: R2_ACCESS_KEY_ID,
            secretAccessKey: R2_SECRET_ACCESS_KEY,
        },
    });
}

const ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export function validatePrescreenFile(file) {
    if (!ALLOWED_TYPES.includes(file.type)) return { ok: false, reason: "type" };
    if (file.size > MAX_BYTES) return { ok: false, reason: "size" };
    return { ok: true };
}

export async function uploadToR2(file, folder = "panacea/prescreen") {
    if (!file) return null;
    if (!isR2Configured || !r2Client) {
        console.warn("R2 not configured; skipping file upload.");
        return null;
    }

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const key = `${folder}/${timestamp}-${safeName}`;

        const command = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        });

        await r2Client.send(command);
        return `${R2_PUBLIC_URL}/${key}`;
    } catch (error) {
        console.error("R2 Upload Error:", error);
        return null;
    }
}
