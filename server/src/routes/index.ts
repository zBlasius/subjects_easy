
import { Router } from "express";
import { postCreateCourse } from "./course/postCreate";
import { authenticate } from "./user/authenticate";
import { postLogin } from "./user/getAuth"
import { postRegister } from "./user/postRegister"
const router = Router()

router.get("/create_course", authenticate, postCreateCourse)
router.post("/login", postLogin);
router.post("/register", postRegister)

export default router;