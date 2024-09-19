import { Router } from "express";
import { uploadVideo } from "./uploadVideo";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const fileRouter = Router()

fileRouter.post("/upload_by_course", upload.single('file'), uploadVideo)

export default fileRouter;