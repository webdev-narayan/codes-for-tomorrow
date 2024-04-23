import { Options, Sequelize } from "sequelize";
import { database_name, database_password, database_port, database_username, dialect } from "../config/config.ts"
const sequelize = new Sequelize({ username: database_username, password: database_password, database: database_name, dialect: dialect, port: database_port, logging: false } as Options)
export default sequelize