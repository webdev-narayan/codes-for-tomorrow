import Joi from "joi"
import { Request, Response, NextFunction } from "express"
export const validateSchema = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const JoiSchema = Joi.object({
            category_name: Joi.string().required(),
            services: Joi.array().items(Joi.object({
                "service_name": Joi.string().required(),
                "type": Joi.string().valid("VIP", "Normal").required(),
                "ServicePriceOptions": Joi.array().items(Joi.object({
                    "duration": Joi.number().positive().required(),
                    "price": Joi.number().required().positive(),
                    "type": Joi.string().valid("Monthly", "Weekly", "Hourly"),
                }))
            })).optional()
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

export const validateServiceSchema = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const JoiSchema = Joi.object({
            "service_name": Joi.string().required(),
            "type": Joi.string().valid("VIP", "Normal").required(),
            "servicePriceOptions": Joi.array().items(Joi.object({
                "duration": Joi.number().positive().required(),
                "price": Joi.number().required().positive(),
                "type": Joi.string().valid("Monthly", "Weekly", "Hourly"),
            })).optional()
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