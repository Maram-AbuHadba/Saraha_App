import AuthRouter from './auth/auth.router.js'
import MessageRouter from './message/message.router.js'
import UserRouter from './user/user.router.js'

const initApp = (app,express) => {
    app.use(express.json())
    app.get('/',(req,res)=>{
        return res.send("hello..!")
    })
    app.use('/auth', AuthRouter)
    app.use('/message', MessageRouter)
    app.use('/user', UserRouter)
    
    app.use('/*',(req,res)=>{      //app.get('/*...)  => هيك ما بتشتغل الا مع الجت ريكوست 
        return res.json({message : "page not found"})
    })

}

export default initApp;