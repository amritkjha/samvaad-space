const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = '$@mv@@d$p@ce'

router.post('/sign-in', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "No such user exists."})
        } console.log('user', user);
        const passwordCompare = await bcrypt.compare(password, user.password); console.log('pscmpr', passwordCompare)
        if(!passwordCompare) {
            return res.status(400).json({message: "Please enter correct credentials."})
        }
        const data = {
            user: {id: user.id}
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        const username = user.username;
        return res.status(200).json({authToken, username});
    } catch(error) {
        return res.status(500).json({message: "Internal server error."})
    }
});

router.post('/sign-up', async(req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({email}); console.log('user', user);
        if(user) { console.log('existing user', user);
            return res.status(400).json({message: "User already registered."})
        }
        const salt = await bcrypt.genSalt(10); console.log('salt', salt)
        const hashPass = await bcrypt.hash(password, salt); console.log('hashPass', hashPass);
        user = await User.create({
            name,
            username,
            email,
            password: hashPass,
        }); console.log('new user', user);
        const data = {
            user: {id: user.id}
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.status(201).json(authToken);
    } catch (error) {
        return res.status(500).json({message: "Internal server error.", error})
    }
})

module.exports = router;