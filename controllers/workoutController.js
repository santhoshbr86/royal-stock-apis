const mongoose = require('mongoose');
const Workout = require('../models/Workout');

// All Workout
const getAllWorkouts = async (req,res) => {
    const {title, load, reps } = req.body;
    try {
        const workout = await Workout.find({});
        res.status(200).json(workout);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}
// Get single Workout
const getWorkout = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such workouts'});
    }
   
        const workout = await Workout.findById(id);
        if(!workout){
            return res.status(404).json({error:'No such workouts1'});
        }
        res.status(200).json(workout);
}

// create Workout
const createWorkout = async (req,res) => {
    const {title, load, reps } = req.body;
    try {
        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// delete single Workout
const deleteWorkout = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such workouts'});
    }
   
        const workout = await Workout.findOneAndDelete({_id:id})
        if(!workout){
            return res.status(404).json({error:'No such workouts1'});
        }
        res.status(200).json(workout);  
}

//update single Workout
const updateWorkout = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such workouts'});
    }
    const workout = await Workout.findOneAndUpdate({_id:id},{...req.body}).findById(id);
    if(!workout){
        return res.status(400).json({error:'No such workouts1'});
    }
    res.status(200).json(workout);
}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}