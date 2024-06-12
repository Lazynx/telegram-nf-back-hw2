import { Router } from 'express';
import authRouter from './auth/auth-router';
// import eventRouter from './events/event-router';
import chatRouter from './chat/chat-router';
// other routers can be imported here

const globalRouter = Router();


globalRouter.use(authRouter);
globalRouter.use(chatRouter);
// globalRouter.use(eventRouter);


// other routers can be added here

export default globalRouter;
