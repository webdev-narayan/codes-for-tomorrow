import Service, { ServiceAttributes } from "../models/Service.ts";
import { Request, text } from 'express';
import { Response } from 'express';
import ServicePriceOption from './../models/ServicePriceOption.ts';
import { createServiceSchema } from "../types/service.ts";

export const create = async (req: Request, res: Response) => {
    try {
        const body: createServiceSchema = req.body;
        const newService = await Service.create({
            service_name: body.service_name,
            CategoryId: body.CategoryId,
            type: body.type
        })

        if (body.servicePriceOptions && body.servicePriceOptions.length) {
            const payloadArray = body.servicePriceOptions.map((item) => {
                return {
                    ServiceId: newService.id,
                    duration: item.duration,
                    price: item.price,
                    type: item.type,
                }
            })
            const newServicePriceOptions = await ServicePriceOption.bulkCreate(payloadArray)
        }
        return res.status(200).send({ message: "Service has been created", data: newService })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const body: ServiceAttributes = req.body;
        const { serviceId } = req.params;
        const updateService = await Service.update({
            service_name: body.service_name,
            CategoryId: body.CategoryId,
            type: body.type
        }, { where: { id: serviceId } })
        return res.status(200).send({ message: "Service has been updated", })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const find = async (req: Request, res: Response) => {
    try {
        const allServices = await Service.findAll();
        return res.status(200).send({ data: allServices })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findOne = async (req: Request, res: Response) => {
    try {
        const { serviceId } = req.params;
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).send({ message: "service not found!" })
        }
        return res.status(200).send({ data: service })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const { serviceId } = req.params;
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).send({ message: "service not found!" })
        }
        await service.destroy()
        return res.status(200).send({ data: service, message: "service has been deleted" })
    } catch (error) {
        return res.status(500).send(error)
    }
}