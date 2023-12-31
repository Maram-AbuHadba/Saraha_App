
import { Router } from "express";
import * as userController from './controller/user.controller.js'
import { auth } from "../../MiddleWare/auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";
import fileUpload, { HME } from "../../services/multer.js";

const router = Router();

router.get('/profile' ,auth, asyncHandler(userController.profile) )
router.patch('/profilePic',auth, fileUpload().single('image'),HME,userController.profilePic)  

export default router;