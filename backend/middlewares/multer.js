import multer from "multer";

// Middleware for handling file uploads
const upload = multer({ storage: multer.diskStorage({}) });

export default upload;
