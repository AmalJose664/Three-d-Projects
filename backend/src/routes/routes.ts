import { Router } from "express";
import { downloadFile, newDeployment, provideProjectFiles, provideProjectIndex, } from "../controller/controller.js";
import { validateObjectId } from "../middleware/validate.js";
import multer from "multer"
import { authorizeActions } from "../middleware/authorizeActions.js";

const upload = multer({ dest: 'public/temp/' });
const router = Router({})

router.get(
	'/downloads/:projectId/:deploymentId',
	validateObjectId('projectId'),
	validateObjectId('deploymentId'),
	downloadFile
);
router.use(
	'/projects/:projectId/:deploymentId',
	validateObjectId('projectId'),
	validateObjectId('deploymentId'),
	provideProjectFiles
);

router.use(
	'/projects/:projectId/:deploymentId',
	validateObjectId('projectId'),
	validateObjectId('deploymentId'),
	provideProjectIndex
);


router.post(
	"/new/:projectId/:deploymentId",
	upload.single("file"),
	authorizeActions,
	validateObjectId('projectId'),
	validateObjectId('deploymentId'),
	newDeployment
);



export default router