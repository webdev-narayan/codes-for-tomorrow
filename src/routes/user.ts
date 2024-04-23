import { Router } from "express";
import { login } from "../controllers/user.ts";
const router = Router();

router.post("/users/login", login)
export default router;