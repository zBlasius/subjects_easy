
import { Router } from "express";
import { postCreateCourse } from "./course/postCreate";
import { authenticate } from "./user/authenticate";

const router = Router()

router.get("/create_course", authenticate, postCreateCourse)
router.get("/login", )

export default router;