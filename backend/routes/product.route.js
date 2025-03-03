import {Router} from "express"
import { createProduct, showProducts, showProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/create").post(
    upload.array("files"),
    createProduct
)

router.route("/all").get(showProducts)

router.route("/:id").get(showProduct)

router.route("/:id").put(updateProduct)

router.route("/:id").delete(deleteProduct)

export default router;