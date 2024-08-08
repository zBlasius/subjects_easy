
import { Router } from "express";
import { postCreateCourse } from "./postCreate";

const courseRouter = Router()

courseRouter.post("/create_course", postCreateCourse)
courseRouter.get("/get_all_course", )

export default courseRouter;