import { NextFunction, Request, Response } from "express";

export const validateObjectId = (parameter: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const id = req.params[parameter];
		const result = /^[0-9a-fA-F]{24}$/.test(id);
		if (!result) {
			res.status(400).json({ error: " Invalid mongodb id", id, from: "storage-server" })
			return
		}
		next();
		return
	};
};