import Joi from "joi"
import { Request, Response, NextFunction } from "express"
export const validateCreateSchema = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const JoiSchema = Joi.object({
            "service_name": Joi.string().required(),
            "type": Joi.string().valid("VIP", "Normal").required(),
            "ServicePriceOptions": Joi.array().items(Joi.object({
                "duration": Joi.number().positive().required(),
                "price": Joi.number().required().positive(),
                "type": Joi.string().valid("Monthly", "Weekly", "Hourly"),
            })),
            CategoryId: Joi.number().positive().required(),
        })
        let validation = JoiSchema.validate(req.body)
        if (validation.error) {
            return res.status(400).send({ message: validation.error.message, error: validation.error })
        }
        next();
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const validateUpdateSchema = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const JoiSchema = Joi.object({
            "service_name": Joi.string().optional(),
            "type": Joi.string().valid("VIP", "Normal").optional(),
        })
        let validation = JoiSchema.validate(req.body)
        if (validation.error) {
            return res.status(400).send({ message: validation.error.message, error: validation.error })
        }
        next();
    } catch (error) {
        return res.status(500).send(error)
    }
}