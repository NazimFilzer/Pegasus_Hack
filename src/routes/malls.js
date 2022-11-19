const express = require('express')
const router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const {
    createMall, getMalls,
} = require('../controllers/malls')
const {protectUser}=require('../middlewares/auth')
const {uploadImage,getImage} = require('../controllers/malls')
// BASE URL - /api/malls

router.post('/', createMall)
router.get('/',getMalls)

router.put('/image/:id', upload.single('file'), uploadImage)
router.get('/image',protectUser,getImage)


module.exports = router
