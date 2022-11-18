const express = require('express')
const router = express.Router()

const {
    createMall, getMalls,
} = require('../controllers/malls')


// BASE URL - /api/malls

router.post('/', createMall)
router.get('/',getMalls)




module.exports = router
