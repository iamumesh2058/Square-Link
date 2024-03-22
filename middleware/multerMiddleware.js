import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let filepath = 'public/uploads';
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true }); // recursive creates sub folder also
        }
        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        // samsung.jpg - original name
        const extension = path.extname(file.originalname);  // .jpg
        let filename = path.basename(file.originalname, extension); // samsung
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        filename += + '-' +uniqueSuffix + extension

        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/[.](jpeg|JPEG|jpg|JPG|png|PNG|gif|GIF|svg|SVG)$/)) {
        return cb(new Error("Invalid image file format"), false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2000000
    }
});


export default upload;