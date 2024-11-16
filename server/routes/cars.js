// routes/carRoutes.js
const express = require('express');
const Car = require('../models/Car');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Car management (create, read, update, delete)
 */

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a new car
 *     description: This endpoint allows logged-in users to create a new car listing.
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the car
 *               description:
 *                 type: string
 *                 description: Description of the car
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of image URLs
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of tags associated with the car
 *     responses:
 *       201:
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars of the logged-in user
 *     description: This endpoint allows logged-in users to fetch all their car listings.
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of cars belonging to the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get a specific car by ID
 *     description: This endpoint allows users to fetch a car listing by its ID.
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single car listing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     description: This endpoint allows users to update a car listing by its ID.
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Car updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     description: This endpoint allows users to delete a car listing by its ID.
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */

router.post('/', verifyToken, async (req, res) => {
    const { title, description, images, tags } = req.body;
    const newCar = new Car({
        title,
        description,
        images,
        tags,
        userId: req.user.id, // Associate car with the logged-in user
    });

    try {
        await newCar.save();
        res.status(201).json(newCar);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const cars = await Car.find({ userId: req.user.id });
        res.json(cars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id, userId: req.user.id });
        if (!car) return res.status(404).json({ error: 'Car not found' });

        res.json(car);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedCar = await Car.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!updatedCar) return res.status(404).json({ error: 'Car not found' });

        res.json(updatedCar);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletedCar = await Car.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!deletedCar) return res.status(404).json({ error: 'Car not found' });

        res.json({ message: 'Car deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
