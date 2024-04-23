import sequelize from "../../database/index.ts";
import { Model, DataTypes, } from "sequelize"
import ServicePriceOption from './ServicePriceOption.ts';


enum type {
    Normal = "Normal",
    VIP = "VIP"
}

export interface ServiceAttributes {
    id?: number;
    service_name: string;
    type: "VIP" | "Normal",
    CategoryId: number;
    // Price_Options:
}
class Service extends Model<ServiceAttributes> {
    public id!: number;
    public service_name!: string;
    public type!: "VIP" | "Normal";
    public CategoryId!: number;

}

Service.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        autoIncrementIdentity: true
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    service_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(...Object.values(type))
    },
}, { sequelize: sequelize, tableName: "Service", "timestamps": true })

Service.hasMany(ServicePriceOption, { foreignKey: "ServiceId", as: "service_price_options" })
ServicePriceOption.belongsTo(Service, { foreignKey: "ServiceId", as: "service" })

export default Service