"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageMiddlewareFactory = void 0;
exports.handleImageFileErrors = handleImageFileErrors;
const multer_1 = __importDefault(require("multer"));
class ImageFormatError extends Error {
}
const storageEngine = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // TODO 1
        const UPLOAD_DIR = process.env.IMAGE_UPLOAD_DIR;
        if (!UPLOAD_DIR) {
            throw new Error("Missing IMAGE_UPLOAD_DIR from env file");
        }
        cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        // TODO 2
        const filetype = file.mimetype;
        console.log(`image type: ${filetype}`);
        let fileExtension = "";
        if (filetype === "image/png") {
            fileExtension = "png";
        }
        else if (filetype === "image/jpg" || filetype === "image/jpeg") {
            fileExtension = "jpg";
        }
        else {
            cb(new ImageFormatError("Unsupported image type"), "");
        }
        const fileName = Date.now() + "-" + Math.round(Math.random() * 1E9) + "." + fileExtension;
        cb(null, fileName);
    }
});
exports.imageMiddlewareFactory = (0, multer_1.default)({
    storage: storageEngine,
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
});
function handleImageFileErrors(err, req, res, next) {
    if (err instanceof multer_1.default.MulterError || err instanceof ImageFormatError) {
        res.status(400).send({
            error: "Bad Request",
            message: err.message
        });
        console.log(err);
        return;
    }
    next(err); // Some other error, let the next middleware handle it
}
