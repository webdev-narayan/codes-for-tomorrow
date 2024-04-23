import { Router } from 'express';
import { create, createService, deleteNoServicesCategory, deleteService, find, findServicesByCategory, update, updateService } from '../controllers/category.ts';
import { validateSchema, validateServiceSchema } from '../middlewares/category.ts';
const router = Router();

router.post("/category", [validateSchema], create);
router.get("/categories", [], find)
router.put("/category/:categoryId", [validateSchema], update);
router.get("/category/:categoryId/services", [], findServicesByCategory)
router.post("/category/:categoryId/services", [validateServiceSchema], createService)
router.delete("/category/:categoryId", [], deleteNoServicesCategory)
router.delete("/category/:categoryId/services/:serviceId", [], deleteService)
router.put("/category/:categoryId/services/:serviceId", [validateServiceSchema], updateService)

export default router