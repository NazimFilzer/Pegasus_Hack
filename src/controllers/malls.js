const express = require("express")
const Mall= require('../models/Malls')

const createMall=(req,res)=>{
    const {name,location,desc}=req.body;
    const newMall = new Mall({
        name,
        location,
        desc,
    })
    newMall.save()
    .then(()=>res.json("Mall added!"))
    .catch(err=>res.status(400).json("Error: "+err));
}

const getMalls = async (req, res) => {
    const malls = await Mall.find();
    res.status(200).json({ malls });
}

module.exports = {
    createMall,
    getMalls
}