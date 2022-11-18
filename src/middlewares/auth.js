const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protectUser = async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from token
            let details = await User.findById(decoded.id)
            req.user = details

            // if (!req.user) {
            //     res.status(401).json({
            //         error: "Unauthorized access"
            //     })
            //     return
            // }
            next()
        } catch (err) {
            console.log(err)
            res.status(401).json({
                error: 'Unauthorized access',
                messege: err,
            })
            return
        }
    }

    if (!token) {
        res.status(401).json({
            error: 'Unauthorized - no token found',
        })
        return
    }
}

// const protectAdmin = async (req, res, next) => {
//     let token

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             // get token from header
//             token = req.headers.authorization.split(' ')[1]

//             // verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET)
//             // console.log(decoded)

//             // get user from token
//             const details = await pool.query(`SELECT id,username from admins where id='${decoded.id}'`)
//             req.admin = details.rows[0];
//             // console.log(req.admin)

//             if (req.admin.rowCount == 0) {
//                 res.status(401).json({
//                     error: "Unauthorized access"
//                 })
//                 return
//             }
//             next()
//         } catch (err) {
//             // console.log(err)
//             res.status(401).json({
//                 error: "Unauthorized access"
//             })
//             return
//         }
//     }

//     if (!token) {
//         res.status(401).json({
//             error: "Unauthorized - no token found"
//         })
//         return
//     }
// }

module.exports = { protectUser }
