const mongoose=require('mongoose')
const express=require('express')
const User=require('../model/User')
const router=new express.Router()

//create user
router.post('/signUp',async (req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        res.status(201).send('SIGN-UP-SUCCESSFULL')
    }catch(e){
        res.status(400).send('SIGN-UP-UNSUCCESSFULL')
    }
})


//user login
router.post('/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        res.send('LOGIN SUCCESSFULL') 
    }catch(e){
        res.status(400).send('LOGIN UNSUCCESSFULL')
    }
})

module.exports=router