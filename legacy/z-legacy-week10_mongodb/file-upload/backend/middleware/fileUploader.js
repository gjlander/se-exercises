import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';

//10MB
const fileSize = 10 * 1024 * 1024;
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

// const fileUploader = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             if (!existsSync(filesDirectory)) {
//                 mkdirSync(filesDirectory, { recursive: true });
//             }
//             cb(null, filesDirectory);
//         },
//         filename: (req, file, cb) => {
//             cb(null, `${Date.now()}-${file.originalname}`);
//         },
//     }),
//     fileFilter: (req, file, cb) => {
//         if (allowedMimeTypes.includes(file.mimetype)) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only images are allowed'));
//         }
//     },
//     limits: {
//         fileSize,
//     },
// });
const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!existsSync('files')) {
            mkdirSync('files', { recursive: true });
        }
        cb(null, 'files');
    },
    // destination: './files',
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniquePrefix + '-' + file.originalname);
    },
});

const fileUploader = multer({ storage, limits: { fileSize }, fileFilter });

export default fileUploader;
