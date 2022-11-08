const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require("bcrypt");
jwt = require("jsonwebtoken");

// Add User 
const register = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const newUser = new User({
        ...req.body
    });
    newUser.password =  await bcrypt.hash(newUser.password, salt);
  
    User.findOne({email: req.body.email}).then((user) => {
         console.log(newUser);
        if(user) {
            return res.status(400).json({email:'User is aleady exists!'})
        } else {
            newUser.save().then(user =>{
              
                  return res.status(200).json({msg:'Registration successfull'});
            });
        }
    });
};

const login = async (req,res) => {
        try{
            const user = await User.findOne({email:req.body.userName});
            console.log('30', user);
            if(user) {
                const cmp = await bcrypt.compareSync(req.body.password, user.password);
                if(cmp) {
                    const token = jwt.sign(
                        { user_id: user._id, email:user.email},
                        process.env.JWT_SECRET_KEY,
                        {
                          expiresIn: "1h",
                        }
                      );
                      delete user.password;
                    res.status(200).json({name:user.name, email:user.email, phone:user.phone, role:user.role, token:token});
                } else {
                    res.status(400).send('Wrong password!');
                } 
                } else {
                    res.status(401).send('Username not found!');
                }
        } catch(err){
            console.log(err);
            res.status(500).send('Server internal Error');
        }
};

// All user
const getUsers = async (req,res) => {
    // const {title, load, reps } = req.body;
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}


module.exports = {
    register,
    getUsers,
    login
}