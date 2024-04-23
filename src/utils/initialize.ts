import initializeTables from "../models/index.ts";
import User from "../models/User.ts";
import bcrypt from "bcryptjs"
const userData = {
    name: "Codes For Tomorrow",
    email: "admin@codesfortomorrow.com",
    password: "Admin123!@#"
}

async function initializeApp() {
    await initializeTables();

    const hasPassword = await bcrypt.hash(userData.password, 10);

    const isAdminExists = await User.findOne({ where: { email: userData.email } });
    if (!isAdminExists) {
        const newUser = await User.create({
            email: userData.email,
            password: hasPassword,
            name: userData.name
        })
    }
    console.log("App has been initialized!")
    process.exit();
}
initializeApp()

// process.exit();