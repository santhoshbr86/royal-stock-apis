require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
// const cookieSession = require("cookie-session");

const workoutRoutes =  require('./routes/workouts');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const authRoutes = require('./routes/auth');

//express app
const app = express();
app.use(cors());
// middleware
app.use(express.json());

app.use('/api/workouts', workoutRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, ()=> {
        console.log(`Listening on port ${process.env.PORT}`);
       });
})
.catch((error) => {
    console.log('Error:', error);
});
