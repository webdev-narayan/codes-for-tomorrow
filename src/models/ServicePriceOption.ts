import { Model, DataType, DataTypes } from "sequelize";
import Service from './Service.ts';
import sequelize from "../../database/index.ts";
enum type {
    Hourly = "Hourly",
    Weekly = "Weekly",
    Monthly = "Monthly"
}
export interface ServicePriceOptionAttributes {
    id?: number,
    ServiceId: number;
    duration: number;
    price: number;
    type: "Hourly" | "Weekly" | "Monthly";
}

class ServicePriceOption extends Model<ServicePriceOptionAttributes> {
    public id?: number;
    public ServiceId!: number;
    public duration!: number
    public price!: number
    public type!: type
}

ServicePriceOption.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        autoIncrementIdentity: true
    },
    ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duration: {
        type: DataTypes.DECIMAL(10, 1),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(...Object.values(type)),
        allowNull: false,
    }
}, {
    sequelize: sequelize,
    tableName: "ServicePriceOption",
    timestamps: true
})

export default ServicePriceOption