const express = require('express')
const router = express.Router()

const {
    userLogin,
    userSignup,
} = require('../controllers/auth/volunteerAuth')
// const { orgLogin, orgSignup } = require('../controllers/auth/orgAuth')
// const protectUser = require('../middlewares/auth')

// BASE URL - /api/auth

router.post('/user/signup', userSignup)
router.post('/user/login', userLogin)


module.exports = router
