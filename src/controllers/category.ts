import { Request, Response } from "express"
import Category, { CategoryAttributes } from "../models/Category.ts";
import Service, { ServiceAttributes } from "../models/Service.ts";
import { createCategorySchema } from './../types/category';
import { createServiceSchema } from "../types/service.ts";
import ServicePriceOption from "../models/ServicePriceOption.ts";
export const create = async (req: Request, res: Response) => {
    try {
        const body: createCategorySchema = req.body;

        const newCategory = await Category.create({
            category_name: body.category_name
        })
        // logics can be add to create service and price options
        return res.status(200).send({ data: newCategory, message: "Category created successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const find = async (req: Request, res: Response) => {
    try {
        const allCategories = await Category.findAll();
        return res.status(200).send({ data: allCategories, message: "Category fetched successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const body: CategoryAttributes = req.body;

        const [count, [updateCategory]] = await Category.update({
            category_name: body.category_name
        }, {
            where: { id: categoryId }, returning: true
        })

        return res.status(200).send({ data: updateCategory, message: "Category updated successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const findServicesByCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const allCategoryServices = await Category.findByPk(categoryId, { include: ["services"] });
        if (!allCategoryServices) {
            return res.status(404).send({ message: "Category not found!" })
        }
        return res.status(200).send({ data: allCategoryServices, message: "Category fetched successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const deleteNoServicesCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findOne({
            include: 'services',
            where: {
                id: categoryId, '$services.id$': null // Check if the associated service id is null
            }
        })
        if (!category) {
            return res.status(404).send({ message: "category not found!" })
        }
        await category.destroy()
        return res.status(200).send({ data: category, message: "Category deleted successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const deleteService = async (req: Request, res: Response) => {
    try {
        const { categoryId, serviceId } = req.params;
        const service = await Service.findOne({ where: { id: serviceId, CategoryId: categoryId } })
        if (!service) {
            return res.status(404).send({ message: "service not found!" })
        }
        await service.destroy()
        return res.status(200).send({ message: "service deleted successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const createService = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const body: createServiceSchema = req.body;
        const isCategoryExists = await Category.findByPk(categoryId)
        if (!isCategoryExists) {
            return res.status(400).send({ message: "category not found!" })
        }
        const newService = await Service.create({
            CategoryId: isCategoryExists.id,
            service_name: body.service_name,
            type: body.type,
        })

        if (body.servicePriceOptions && body.servicePriceOptions.length) {
            const payloadArray = body.servicePriceOptions.map((item) => {
                return {
                    ServiceId: newService.id,
                    duration: item.duration,
                    type: item.type,
                    price: item.price
                }
            })
            await ServicePriceOption.bulkCreate(payloadArray)
        }

        return res.status(200).send({ data: newService, message: "service created successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const updateService = async (req: Request, res: Response) => {
    try {
        const { categoryId, serviceId } = req.params;
        const body: createServiceSchema = req.body;
        const service = await Service.findOne({ where: { id: serviceId, CategoryId: categoryId } })
        if (!service) {
            return res.status(404).send({ message: "service not found!" })
        }
        await service.update({ CategoryId: parseInt(categoryId), service_name: body.service_name, type: body.type })
        if (body.servicePriceOptions)
            return res.status(200).send({ message: "Service updated successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}
