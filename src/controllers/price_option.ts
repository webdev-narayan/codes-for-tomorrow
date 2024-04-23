import { Request, Response } from 'express';
import ServicePriceOption, { ServicePriceOptionAttributes } from './../models/ServicePriceOption.ts';

export const create = async (req: Request, res: Response) => {
    try {
        const body: ServicePriceOptionAttributes = req.body;
        const newServicePriceOption = await ServicePriceOption.create({
            ServiceId: body.ServiceId,
            duration: body.duration,
            price: body.price,
            type: body.type
        })
        return res.status(200).send({ message: "Service Price Option has been created", data: newServicePriceOption })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { priceOptionId } = req.params;
        const body: ServicePriceOption = req.body;
        const updateService = await ServicePriceOption.update({
            duration: body.duration, price: body.price, ServiceId: body.ServiceId, type: body.type
        }, { where: { id: priceOptionId } })
        return res.status(200).send({ message: "Service has been updated", })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const find = async (req: Request, res: Response) => {
    try {
        const allSPriceOptions = await ServicePriceOption.findAll();
        return res.status(200).send({ data: allSPriceOptions })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findOne = async (req: Request, res: Response) => {
    try {
        const { priceOptionId } = req.params;
        const servicePoption = await ServicePriceOption.findByPk(priceOptionId);
        if (!servicePoption) {
            return res.status(404).send({ message: "service not found!" })
        }
        return res.status(200).send({ data: servicePoption })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const { priceOptionId } = req.params;
        const service = await ServicePriceOption.findByPk(priceOptionId);
        if (!service) {
            return res.status(404).send({ message: "service not found!" })
        }
        await ServicePriceOption.destroy()
        return res.status(200).send({ data: service, message: "service has been deleted" })
    } catch (error) {
        return res.status(500).send(error)
    }
}
