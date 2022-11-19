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


const uploadImage = async (req, res) => {
    try {
        const file = req.file
        const postId = req.params.id
        // Check if Postid is in Post Collection
        const myPost = await Post.findById(postId);
        if (!myPost) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }
        const imageName = req.file.originalname

        // Function to resize Images
        // const fileBuffer = await sharp(file.buffer)
        //     .resize({ height: 1920, width: 1080, fit: "contain" })
        //     .toBuffer()
        const fileBuffer = file.buffer;

        // console.log(imageName)
        await uploadFile(fileBuffer, imageName, file.mimetype)
        const post = await Post.findOneAndUpdate(
            { _id: postId },
            { imageUrl: imageName },
            { new: true }
        )
        res.status(201).json({
            message: 'Image uploaded successfully',
            post_details: post,
        })
    } catch (error) {
        console.log(error)
    }
}

const getImage = async (req, res) => {
    try {
        const posts = await Post.find({ imageUrl: { $ne: '' } });
        const imageUrl = posts.map((post) => {
            const url = getObjectSignedUrl(post.imageUrl);
            return url;
        })
        const imageUrls = await Promise.all(imageUrl)
        // console.log(imageUrls)

        res.status(201).json({
            message: 'Image Shown successfully',
            imageUrls: imageUrls,
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createMall,
    getMalls,uploadImage,getImage
}