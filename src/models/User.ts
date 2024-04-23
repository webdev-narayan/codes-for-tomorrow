import { Model, DataType, DataTypes } from "sequelize";
import sequelize from "../../database/index.ts";

interface UserAttributes {
    id?: number;
    name?: string;
    email: string;
    password?: string;
}
class User extends Model<UserAttributes> {
    public id!: number;
    public name?: string;
    public email!: string;
    public password?: string;
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize, tableName: "User", timestamps: true
})
export default User