const express = require('express')
const router = express.Router()
const Farmer = require('../models/Farmer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

router.post('/createFarmer',async (req,res)=>{
    try {
        const data = req.body
        const { name,password, phoneNumber,age,landSize,location,crops } = data;
        const phoneNumberExists = await Farmer.findOne({ phoneNumber })
        if (phoneNumberExists) {
            res.status(422).json({ 'Warning': 'User already exists' })
        }
        else {
            const hashedPass = await bcrypt.hash(password, 10)
            const saveFarmer = await new Farmer({  name,password:hashedPass, phoneNumber,age,landSize,location,crops })
            const user = {
                _id: saveFarmer._id
            }
            const authToken = jwt.sign({ user }, process.env.SECRET_KEY)
            await saveFarmer.save()
            res.json({ 'Success': 'User Farmer Saved', authToken})
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/loginFarmer',async (req,res)=>{
    try {
        const data = req.body;
        const {phoneNumber,password} = data;
        const phoneNumberExists = await Farmer.findOne({phoneNumber});
        if(!phoneNumberExists){
            res.status(400).json({ 'Error': "No User Exists" })
        }
        else{
            const passMatch = await bcrypt.compare(password,phoneNumberExists.password);
            if (!passMatch) {
                res.status(400).json({ 'Error': "Wrong Credentials" })
            }
            else{
                const user = {
                    _id: phoneNumberExists._id
                }
                const authToken = jwt.sign({ user }, process.env.SECRET_KEY)
                res.json({ 'Success': true, authToken })
            }
        }
    } catch (err) {
        res.json({Error:err.message})
        // console.log(err);
    }
})

module.exports = router