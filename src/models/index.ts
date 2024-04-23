import Category from "./Category.ts";
import Service from "./Service.ts";
import User from "./User.ts";
import ServicePriceOption from "./ServicePriceOption.ts";
import sequelize from "../../database/index.ts";

export default async function initializeTables() {
    await Category.sync();
    await Service.sync();
    await User.sync();
    await ServicePriceOption.sync();
    await sequelize.sync({ alter: true })
    console.log("database initialized!")
}
