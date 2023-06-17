import { Router } from "express"
import * as MeassgeController from './controller/message.controller.js'
import { auth } from "../../MiddleWare/auth.middleware.js"


const router = Router()

router.post('/:recieverId', MeassgeController.sendMessage)
router.get('/',auth, MeassgeController.getMessages)
router.delete('/:messageId',auth, MeassgeController.deleteMessages)

export default router