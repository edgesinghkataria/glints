import {Router} from 'express';
import UserController from '../controller/UserController';

const categoriesRouter = Router();

categoriesRouter.post('/order', UserController.placeOrder);

export default categoriesRouter;
