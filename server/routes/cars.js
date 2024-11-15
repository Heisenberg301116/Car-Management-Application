const express = require('express');
const Car = require('../models/Car');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retrieve a list of cars
 *     description: Fetch all cars from the database.
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The car ID
 *                   title:
 *                     type: string
 *                     description: The car title
 *                   description:
 *                     type: string
 *                     description: The car description
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Retrieve a single car
 *     description: Get details of a specific car by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car ID
 *     responses:
 *       200:
 *         description: Details of the car
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Car not found
 */

// Create a new car
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

// Get all cars of the logged-in user
router.get('/', verifyToken, async (req, res) => {
    try {
        // console.log("=============> inside get cars")
        const cars = await Car.find({ userId: req.user.id });
        res.json(cars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a specific car by ID
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

// Update a car by ID
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

// Delete a car by ID
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
