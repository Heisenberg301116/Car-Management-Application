const express = require('express');
const cloudinary = require('../cloudinary');
const router = express.Router();
const multer = require('multer');

// Multer memory storage to hold file in memory as a buffer
const upload = multer();

// Upload image to Cloudinary
router.post('/', upload.single('file'), async (req, res) => {
    try {
        // console.log("============> request arrived inside endpoint !!!");

        // Use cloudinary's upload method with the buffer from multer
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
