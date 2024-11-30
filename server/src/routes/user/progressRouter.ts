
import { Router } from "express";
import { postActiveCourse } from "./postActiveCourse";

const progressRouter = Router()

progressRouter.post("/create", postActiveCourse)

export default progressRouter;