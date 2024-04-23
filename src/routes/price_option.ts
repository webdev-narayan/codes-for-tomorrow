import { Router } from 'express';
import { create, destroy, find, findOne, update } from '../controllers/price_option.ts';
const router = Router();

router.post("/price-option", [], create)
router.get("/price-options", [], find)
router.put("/price-option/:priceOptionId", [], update)
router.delete("/price-option/:priceOptionId", [], destroy)
router.get("/price-option/:priceOptionId", [], findOne)
export default router;