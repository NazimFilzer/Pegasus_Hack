const express = require("express")
const Room = require('../models/Rooms');
const Mall = require('../models/Malls');

const createRoom = (req, res) => {
    const { roomNumbers } = req.body;
    const newRoom = new Room({ roomNumbers })
    newRoom.save()
    const mallId = req.params.id;
    Mall.findByIdAndUpdate
        (
            mallId,
            { $push: { rooms: newRoom._id } },
            { new: true }
        )
        .then(() => {
            res.status(200).json("Room added successfully");
        })

}


const getRoomNumber = async (req, res) => {
    const rooms = await Room.find();
    // console.log(rooms)
    const roomNumbers = rooms.map((room) => room.roomNumbers);
    // console.log(roomNumbers)
    res.status(200).json(roomNumbers);

}


const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.roomId },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        const data = {
            toEmail: req.userId.email,
            subject: `The Parking Slot ${roomNumber} is booked`,
            content: `The Parking Slot ${roomNumber} is booked for the dates ${req.body.dates}`
        }
        const response = await axios.post(process.env.EMAIL, data);
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};



module.exports = {
    createRoom,
    getRoomNumber,
    updateRoomAvailability
}