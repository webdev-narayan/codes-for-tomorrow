import { Router } from "express";
const router = Router();
import categoryRoutes from "./category.ts"
import serviceRoutes from "./service.ts"
import userRouter from "./user.ts"
import pOptionRouter from "./price_option.ts"
import accessControll from "../middlewares/accessControll.ts"
router.use([accessControll], categoryRoutes)
router.use([accessControll], serviceRoutes)
router.use(userRouter)
router.use([accessControll], pOptionRouter)

export default router