import {Router} from "express"
import { createProduct, showProducts } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/create").post(
    upload.array("files"),
    createProduct
)

router.route("/all").get(showProducts)

export default router;