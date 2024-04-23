import express from "express";
import router from './src/routes/index.ts';
import morgan from "morgan"
const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(router)
export default app;