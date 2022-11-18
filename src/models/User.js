const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    type: String, // user type [volunteer, org]
    name: String,
    phoneNumber: String,
    imageUrl: {
        type: String,
        default: ''
    },
    city: String,
    state: String,

    //Organization extra fields
    domain: String,
    desc: String,
})

const User = mongoose.model('user', UserSchema)
module.exports = User

// // Common for all
// uid
// email
// password
// username
// type
// phoneNumber
// city
// coordinates
// DOJ

// // Organization
// domain
// desc
// mission: {
//     type: String,
//     default: "",
//   },
// vision: {
//     type: String,
//     default: "",
//   },
// coreValues: {
//     type: String,
//     default: "",
//   },
