import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { existsSync } from "fs";

import { fileURLToPath } from "url";
import AdmZip from 'adm-zip';
import { mkdir, unlink } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export function provideProjectFiles(req: Request, res: Response, next: NextFunction): void {
	const projectId = req.params.projectId;
	const deploymentId = req.params.deploymentId;

	const projectPath = path.join(__dirname, "..", "..", 'public', 'user-projects', projectId, deploymentId);
	express.static(projectPath, {
		setHeaders: (res, filePath, stat) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('X-Project-Id', projectId);
			res.setHeader('X-File-Path', path.relative(projectPath, filePath));
			res.setHeader('X-File-Size', stat.size);
		},
	})(req, res, next);
}


export function provideProjectIndex(req: Request, res: Response): void {

	const projectId = req.params.projectId;
	const deploymentId = req.params.deploymentId;
	const indexPath = path.join(__dirname, "..", "..", 'public', 'user-projects', projectId, deploymentId, 'index.html');
	res.sendFile(indexPath);
};

export async function downloadFile(req: Request, res: Response) {
	const { deploymentId, projectId } = req.params;
	const { filePath } = req.query as { filePath: string };

	try {

		const fullPath = path.join(
			process.cwd(),
			'public',
			'user-projects',
			projectId,
			deploymentId,
			filePath
		);
		console.log(filePath)


		const normalizedPath = path.normalize(fullPath);
		const publicDir = path.join(process.cwd(), 'public');

		if (!normalizedPath.startsWith(publicDir)) {
			return res.status(403).json({ error: 'Forbidden' });
		}


		if (!existsSync(normalizedPath)) {
			return res.status(404).json({ error: 'File not found' });
		}


		const fileName = path.basename(filePath);
		res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
		res.sendFile(normalizedPath);

	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Internal server error' });
	}
}


export async function newDeployment(req: Request, res: Response) {
	try {
		const { deploymentId, projectId } = req.params;
		if (!req.file) {
			return res.status(400).json({ error: 'No file uploaded' });
		}
		const extractPath = path.join(__dirname, '../public', 'user-projects', projectId, deploymentId);
		if (!existsSync(extractPath)) {
			await mkdir(extractPath, { recursive: true });
		}
		const zip = new AdmZip(req.file.path);
		zip.extractAllTo(extractPath, true);
		await unlink(req.file.path);
		console.log(`Files extracted to: ${extractPath}`);
		res.json({
			success: true,
			extractPath
		});
	} catch (error) {
		console.log(error)
		if (req.file?.path && existsSync(req.file.path)) {
			await unlink(req.file.path);
		}
		res.status(500).json({ error: 'Internal server error' });
	}
}








