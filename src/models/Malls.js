const mongoose = require( "mongoose")
const MallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    distance: {
        type: String,
    },
    desc: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    rooms: {
        type: [String],
    },

});

const Mall=mongoose.model("Mall",MallSchema)
module.exports=Mall
