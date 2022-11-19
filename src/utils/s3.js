const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')



const bucketName = process.env.BUCKET
const region = process.env.REGION
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.ACCESS_SECRET

const s3Client = new S3Client({
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    },
    region: region
})


const uploadFile = (fileBuffer, fileName, mimetype) => {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
    }

    return s3Client.send(new PutObjectCommand(uploadParams));
}

// export function deleteFile(fileName) {
//   const deleteParams = {
//     Bucket: bucketName,
//     Key: fileName,
//   }

//   return s3Client.send(new DeleteObjectCommand(deleteParams));
// }

const getObjectSignedUrl = async (key) => {
    const params = {
        Bucket: bucketName,
        Key: key
    }
    // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    const command = new GetObjectCommand(params);
    const seconds = 60 * 15

    const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

    return url
}

module.exports = { uploadFile, getObjectSignedUrl }


//////////////////Multer Config/////////////////////
// const imageStorage = multer.diskStorage({
//     // Destination to store image
//     destination: 'images',
//     filename: (req, file, cb) => {
//         // console.log("file", file)
//         cb(null, file.originalname)
//         // file.fieldname is name of the field (image)
//         // path.extname get the uploaded file extension
//     }
// });
// const imageUpload = multer({
//     storage: imageStorage,
//     limits: {
//         fileSize: 1000000 // 1000000 Bytes = 1 MB
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(png|jpg)$/)) {
//             // upload only png and jpg format
//             return cb(new Error('Please upload a Image'))
//         }
//         cb(undefined, true)
//     }
// })
