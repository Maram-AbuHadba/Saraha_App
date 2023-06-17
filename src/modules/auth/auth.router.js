import { Router } from "express";
import * as AuthController from './controller/auth.controller.js'
import { asyncHandler } from "../../services/errorHandling.js";
import validation from "../../MiddleWare/validation.middleware.js";
import * as validators from "./auth.validation.js"
const router = Router()


router.post('/signup',validation(validators.signupSchema) , asyncHandler(AuthController.signup));
router.post('/signin',validation(validators.loginSchema) , asyncHandler(AuthController.signin));
router.get('/confirmEmail/:token', AuthController.confirmEmail);

export default router