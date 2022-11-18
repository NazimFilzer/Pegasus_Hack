const mongoose = require('mongoose')
const User = require('./User')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: User,
    },
    title: { type: String, required: true },
    desc: String,
    createdOn: { type: Date, required: true },
    numberOfServing: { type: Number, required: true },
    expiry: { type: Date, required: true },
    isNonVeg: { type: Boolean, required: true },
    userName: String,
    coordinates: {
        lat: Number,
        lng: Number,
    },
    address: String,
    city: String,
    state: String,
    country: {
        type: String,
        default: 'India',
    },
    contactInfo: String,
    isAccepted: {
        type: Boolean,
        default: false,
    },
    isAcceptedBy: {
        type: Schema.Types.ObjectId,
        ref: User,
    },
    isDelivery: {
        type: Boolean,
        default: false,
    },
    isDeliveredBy: {
        type: Schema.Types.ObjectId,
        ref: User,
    },
    isDeliveryConfirmed: {
        type: Boolean,
        default: false,
    },
    isMyself: { // The User will Deliver the food himself 
        type: Boolean,
        default: false,
    },
    imageUrl: {
        type: String,
        default: null,
    },
})

const Post = mongoose.model('post', PostSchema)
module.exports = Post

// Address
// City
// State
// Country Default india
// contact info
// photo link
// isAceppted
// isDeliveryBydonor
// isDeliveryByVolunteer
// isDeliveryConfimed
