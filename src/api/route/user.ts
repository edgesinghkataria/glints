import {Router} from 'express';
import UserController from '../controller/UserController';

const userRouter = Router();

userRouter.post('/order', UserController.placeOrder);

export default userRouter;
