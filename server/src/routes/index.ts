
import { Router } from "express";
import { authenticate } from "./user/authenticate";
import { postLogin } from "./user/getAuth"
import { postRegister } from "./user/postRegister"
import courseRouter from "./course/courseRouter";
const router = Router()

router.post("/course", authenticate, courseRouter)
router.post("/login", postLogin);
router.post("/register", postRegister)

export default router;