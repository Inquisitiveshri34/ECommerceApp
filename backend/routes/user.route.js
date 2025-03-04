import {Router} from "express"
import { registerUser,loginUser,addProductToCart  } from "../controllers/user.controller.js";
import {authUser} from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/product/:id").post(
    authUser,
    addProductToCart 
)

export default router;