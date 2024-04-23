import { Model, DataTypes } from "sequelize"
import sequelize from "../../database/index.ts"
import Service from "./Service.ts"

export interface CategoryAttributes {
    id?: number;
    category_name: string
}

class Category extends Model<CategoryAttributes> {
    public id!: number;
    public category_name!: string;
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        autoIncrementIdentity: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize: sequelize,
        tableName: "Category",
        timestamps: true
    })

// Category.sync();
// Category.associate(Service)
Category.hasMany(Service, { foreignKey: "CategoryId", as: "services" })
Service.belongsTo(Category, { foreignKey: "CategoryId", as: "category" })

export default Category;