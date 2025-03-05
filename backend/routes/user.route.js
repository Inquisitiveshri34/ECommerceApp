import {Router} from "express"
import { registerUser,loginUser,profileUser, addProductToCart,showCartItems,updateQuantity  } from "../controllers/user.controller.js";
import {authUser} from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/profile").get(
    authUser,
    profileUser
)

router.route("/product/:id").post(
    authUser,
    addProductToCart 
)

router.route("/product/cart").get(
    authUser,
    showCartItems
)

router.route("/product/:productId").put(
    authUser,
    updateQuantity
)

export default router;