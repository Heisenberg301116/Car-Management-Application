// routes/imageUpload.js
const express = require('express');
const cloudinary = require('../cloudinary');
const router = express.Router();
const multer = require('multer');

// Multer memory storage to hold file in memory as a buffer
const upload = multer();

/**
 * @swagger
 * tags:
 *   name: ImageUpload
 *   description: Image upload API to Cloudinary
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image to Cloudinary
 *     description: This endpoint allows you to upload an image file to Cloudinary and get the image URL.
 *     tags: [ImageUpload]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         description: The image file to upload
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: The URL of the uploaded image.
 *       400:
 *         description: Bad request, the file was not provided.
 *       500:
 *         description: Internal server error, failed to upload image to Cloudinary.
 */
router.post('/', upload.single('file'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    return res.status(500).json({ error: 'Image upload failed', message: error });
                }
                res.json({ url: result.secure_url });
            }
        );

        // Pipe the file buffer to Cloudinary's upload_stream
        result.end(req.file.buffer);

    } catch (error) {
        res.status(500).json({ error: 'Image upload failed', message: error.message });
    }
});

module.exports = router;
