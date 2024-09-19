import { Router } from "express";
import { uploadVideo } from "./uploadVideo";

const fileRouter = Router()

fileRouter.post("/upload_by_course", uploadVideo)

export default fileRouter;