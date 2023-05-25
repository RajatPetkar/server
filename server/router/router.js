const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../model/schema.js");
const auth = require("../middleware/auth")
const router = new express.Router();


require("../db/conn");

router.get("/", (req, res) => {
  res.send("Hello, world");
});

router.post("/register", async (req, res) => {
    try {
      const{email,password,cpassword} = req.body;
      // const emails = await user.findOne({email:email});
      // if(emails){
      //   console.log('Email already exist');
      //   return;
      // }
      if(password!==cpassword){
        console.log('Please enter valid crediancial');
        return;
      }
      const Data = new user({
        name: req.body.name,
        email: req.body.email,
        work: req.body.work,
        phone: req.body.phone,
        password: req.body.password,
        cpassword: req.body.cpassword,
        img: req.body.img,
      });

      const userData = await Data.save();
      if (userData) {
        console.log("User registered successfully");
        res.status(200).json({success:"Data is saved"});
      }
    } catch (error) {
      console.log(error);
      res.json({error:"error is occured"});
    }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const result = await user.findOne({ email: email });
    const isValid = await bcrypt.compare(password, result.password);

    const token = await result.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 5000000),
    });
    
    console.log(token);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid Crediencial" });
    } else {
      res.status(200).json({ Success: "User Login successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error is occured" });
  }
});

router.get('/about',auth,(req,res)=>{
  res.send(req.rootUser)
})

router.get('/contact',auth,(req,res)=>{
  res.send(req.rootUser)
})

router.post('/contact',auth,async(req,res)=>{
  try {
   const {name,email,message,work,img}= req.body;
   if(!name || !email || !message){
    return res.json({error:"Plz fill the form"});
    console.log('error in form');
   }
   const users = await user.findOne({_id:req.userId})
   if(user){
    const userMsg = await users.addMessage(name,email,message,work,img);
    await users.save();
    res.status(201).json({success:"User contact successfully"})
   }
  } catch (error) {
    console.log(error);
  }
})


module.exports = router;
