const mongoose=require("mongoose")
const RoomSchema = new mongoose.Schema(
    {
        number: {
            type: String,
        },
        price: {
            type: Number,
        },
        maxPeople: {
            type: Number,
        },
        desc: {
            type: String,
        },
        roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    },
    { timestamps: true }
);

Room=mongoose.model("Room",RoomSchema)
module.exports=Room

