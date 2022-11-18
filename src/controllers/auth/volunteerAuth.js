const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const maxAge = 3 * 24 * 60 * 60 // 3days expire
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    })
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await User.findOne({ email: email })
        console.log(admin)

        if (!admin) {
            return res.status(401).json({
                error: 'Invalid email/password',
            })
        }

        if (await bcrypt.compare(password, admin.password)) {
            const token = createToken(admin.id)

            return res.status(200).json({
                message: 'Successfully Logged in',
                token: token,
                user:admin,
            })
        }
        return res.status(401).json({
            error: 'Invalid email/password',
        })
    } catch (error) {
        console.log(error)
    }
}

const userSignup = async (req, res) => {
    const { email, password, name } = req.body
    if (!email) {
        return res.status(400).json({ error: 'Invalid email' })
    }

    if (!password) {
        return res.status(400).json({ error: 'Invalid password' })
    }

    if (password.length < 5) {
        return res.status(400).json({
            error: 'Password must be atleast 6 characters',
        })
    }

    const encryptPassword = await bcrypt.hash(password, 10)
    console.log(encryptPassword)
    try {
        const user = await User.create({
            email,
            password: encryptPassword,
            type: 'volunteer',
            name
        })

        const token = createToken(user._id)
        res.status(201).json({
            message: 'Account Created',
            user: user,
            token: token,
        })
    } catch (err) {
        return res
            .status(500)
            .json({ error: 'Something went wrong', message: err.message })
    }
}

module.exports = { userLogin, userSignup }
