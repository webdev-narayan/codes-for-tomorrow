import { Router } from 'express';
import { create, destroy, find, findOne, update } from '../controllers/service.ts';
import { validateCreateSchema, validateUpdateSchema } from '../middlewares/service.ts';
const router = Router();

router.post("/service", [validateCreateSchema], create)
router.get("/services", [], find)
router.put("/service/:serviceId", [validateUpdateSchema], update)
router.delete("/service/:serviceId", [], destroy)
router.get("/service/:serviceId", [], findOne)
export default router;