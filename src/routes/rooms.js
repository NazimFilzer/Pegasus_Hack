const express = require('express')
const router = express.Router()


const { createRoom, getRoomNumber,  updateRoomAvailability } = require('../controllers/rooms')


// BASE URL - /api/rooms

router.post('/:id', createRoom)
router.get('/', getRoomNumber)
router.post('/book/:roomId', updateRoomAvailability)




module.exports = router
