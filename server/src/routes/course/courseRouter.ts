
import { Router } from "express";
import { getAllCourses } from "./getAllCourses";
import { postCreateCourse } from "./postCreate";

const courseRouter = Router()

courseRouter.post("/create_course", postCreateCourse)
courseRouter.get("/get_all_course", getAllCourses)

export default courseRouter;