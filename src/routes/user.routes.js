import { Router } from "express";
import { loginUser, userRegister,logoutUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifJWT } from "../middlewares/auth.middlewares.js"


const router = Router()

router.route("/register").post(
upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
]) ,  
    userRegister
);

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifJWT,logoutUser)
export default router;