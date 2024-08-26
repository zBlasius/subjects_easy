
import { Router } from "express";
import { getAllCourses } from "./getAllCourses";
import { postCreateCourse } from "./postCreate";

const courseRouter = Router()

courseRouter.post("/create", postCreateCourse)
courseRouter.get("/get_all", getAllCourses)

export default courseRouter;