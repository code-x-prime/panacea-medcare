import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Compress and save an image to the public/testimonials folder
 * @param {Buffer} imageBuffer - The image buffer from uploaded file
 * @param {string} originalName - Original filename
 * @returns {Promise<string>} - The relative path to the saved image
 */
export async function compressAndSaveImage(imageBuffer, originalName) {
    try {
        // Create testimonials directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'testimonials');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const ext = 'webp'; // Convert all images to WebP for better compression
        const filename = `${timestamp}-${randomString}.${ext}`;
        const filepath = path.join(uploadsDir, filename);

        // Compress and save image
        await sharp(imageBuffer)
            .resize(800, 800, {
                fit: 'inside',
                withoutEnlargement: true,
            })
            .webp({ quality: 80 })
            .toFile(filepath);

        // Return relative path for database storage
        return `/testimonials/${filename}`;
    } catch (error) {
        console.error('Error compressing image:', error);
        throw new Error('Failed to compress and save image');
    }
}

/**
 * Delete an image from the public/testimonials folder
 * @param {string} imagePath - The relative path to the image (e.g., /testimonials/image.webp)
 */
export function deleteImage(imagePath) {
    try {
        if (!imagePath) return;

        const filepath = path.join(process.cwd(), 'public', imagePath);
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
    } catch (error) {
        console.error('Error deleting image:', error);
    }
}

/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null if invalid
 */
export function extractYouTubeId(url) {
    if (!url) return null;

    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

/**
 * Validate YouTube URL
 * @param {string} url - YouTube URL to validate
 * @returns {boolean} - True if valid YouTube URL
 */
export function isValidYouTubeUrl(url) {
    return extractYouTubeId(url) !== null;
}
