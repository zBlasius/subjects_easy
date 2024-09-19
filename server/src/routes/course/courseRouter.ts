
import { Router } from "express";
import { getAllCourses } from "./getAllCourses";
import { postCreateCourse } from "./postCreate";
import { getById } from "./getById";
import fileRouter from "./fileRouter";

const courseRouter = Router()

courseRouter.post("/create", postCreateCourse)
courseRouter.get("/list", getAllCourses)
courseRouter.get("/get_by_id", getById)
courseRouter.use("/file", fileRouter)

export default courseRouter;