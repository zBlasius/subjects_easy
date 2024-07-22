
import { Router } from "express";
import { postCreateCourse } from "./postCreate";

const courseRouter = Router()

courseRouter.post("/create_course", postCreateCourse)

export default courseRouter;