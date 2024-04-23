import JWT from "jsonwebtoken";
import { jwt_secret } from "../../config/config.ts";
import { Request } from "express";
export function issue(payload: object) {
    try {
        const token = JWT.sign(payload, jwt_secret || "123", {
            expiresIn: "7d",
        });
        return token;
    } catch (error) {
        console.log(error);
        return { error };
    }
}
export function verifyJWT(req: Request): any {
    try {
        if (req.headers.hasOwnProperty("authorization")) {
            const token = req?.headers?.authorization?.split(" ")[1];
            const data = JWT.verify(token || "error", jwt_secret || "123");
            return data;
        } else {
            return { error: "No Bearer token passed in the request header" };
        }
    } catch (error) {
        console.log(error);
        return { error };
    }
}
