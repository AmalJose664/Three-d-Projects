import { NextFunction, Request, Response } from "express";

export const authorizeActions = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	if (!token) {
		console.log("No token");
		return res.status(401).json({ message: "File uploading failed, No container token provided" });
	}
	const server_token = process.env.CONTAINER_API_TOKEN;

	if (token !== server_token) {
		console.log("Invalid token");
		console.log(server_token, "<<<>>>>", token);

		return res.status(401).json({ message: "File uploading failed, Invalid token" });
	}
	next();
};