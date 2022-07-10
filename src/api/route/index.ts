import {Router} from 'express';
import userRouter from './user';
import restaurantRouter from './restaurant';

const router = Router();

router.use('/user', userRouter);
router.use('/restaurant', restaurantRouter);

export default router;
