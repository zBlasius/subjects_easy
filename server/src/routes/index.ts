
import { Router } from "express";
import { authenticate } from "./user/authenticate";
import { postLogin } from "./user/getAuth"
import { postRegister } from "./user/postRegister"
import { getHeadProgress } from "./user/getHeadProgress";
import { postActiveCourse } from "./user/postActiveCourse";
import courseRouter from "./course/courseRouter";
import progressRouter from "./user/progressRouter";
const router = Router()

router.use("/course", authenticate, courseRouter)
router.use("/progress", authenticate, progressRouter)
router.post("/login", postLogin);
router.post("/register", postRegister);
router.post("/active_course", postActiveCourse)
router.get("/get_head_progress", getHeadProgress)

export default router;