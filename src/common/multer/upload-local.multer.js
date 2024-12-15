import multer from 'multer';
import path from 'path'
import fs from 'fs'

fs.mkdirSync('images/', {recursive: true})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileext =  path.extname(file.originalname)
      const filename = 'local' + '-' + uniqueSuffix + fileext
      cb(null, filename)
    }
  })
  
  const uploadLocal = multer({ storage: storage })


export default uploadLocal