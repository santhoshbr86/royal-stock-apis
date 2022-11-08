const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const workoutController = require('../controllers/workoutController');

router.get('/', workoutController.getAllWorkouts);

router.get('/:id', workoutController.getWorkout);

router.post('/', workoutController.createWorkout);

router.delete('/:id', workoutController.deleteWorkout);

router.patch('/:id', workoutController.updateWorkout);

module.exports = router;
