
import { Router } from "express";
import { authenticate } from "./user/authenticate";
import { postLogin } from "./user/getAuth"
import { postRegister } from "./user/postRegister"
import courseRouter from "./course/courseRouter";
import { getHeadProgress } from "./user/getHeadProgress";
const router = Router()

router.use("/course", authenticate, courseRouter)
router.post("/login", postLogin);
router.post("/register", postRegister);
router.get("/get_head_progress", getHeadProgress)

export default router;