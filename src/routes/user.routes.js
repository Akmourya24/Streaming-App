import { Router } from "express";
import {
    userRegister,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    getCurrentUser,
    changeAccountDetails,
    updateUserAvatar,
    updateUserCover,
    getChennelUserProfile,
    getWatchHistory
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifJWT } from "../middlewares/auth.middlewares.js"


const router = Router()

router.route("/register").post(
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
    ]),
    userRegister
);

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifJWT, changePassword)
router.route("/current-user").get(verifJWT, getCurrentUser)
router.route("/update-user").patch(verifJWT, changeAccountDetails)
router.route("/update-avatar").patch(verifJWT, upload.single("avatar"), updateUserAvatar)
router.route("/update-cover").patch(verifJWT, upload.single("cover"), updateUserCover)
router.route("/c/:username").get(verifJWT, getChennelUserProfile)
router.route("/history").get(verifJWT, getWatchHistory)

export default router;