import { config } from "dotenv"
config()

export const port: number = parseInt(process.env.port || "4567", 10);
export const jwt_secret: string | undefined = process.env.jwt_secret;
export const database_username: string | undefined = process.env.database_username;
export const database_password: string | undefined = process.env.database_password;
export const database_name: string | undefined = process.env.database_name;
export const dialect: string | undefined = process.env.dialect;
export const database_port: string | undefined = process.env.database_port;