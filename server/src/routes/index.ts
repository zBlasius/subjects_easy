
import { Router } from "express";
import { postCreateCourse } from "./course/postCreate";

const router = Router()

router.use("/create_course", postCreateCourse)
router.use("/login", )

export default router;