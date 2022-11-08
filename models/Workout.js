const mongoose = require('mongoose');

const schema = mongoose.Schema;

const workoutShema = new schema ({
    title:{
        type:String,
        require:true
    },
    load: {
        type:Number,
        require:true
    },
    reps: {
        type:Number,
        require:true
    }
}, { timestamps: true});

module.exports =  mongoose.model('Workout', workoutShema);
