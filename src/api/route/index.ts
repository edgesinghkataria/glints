import {Router, Request, Response} from 'express';
import userRouter from './user';
import restaurantRouter from './restaurant';
import etl from '../../script';

const router = Router();

router.use('/user', userRouter);
router.use('/restaurant', restaurantRouter);

router.use(
  '/run',
  Router().get(
    '/etl',
    async (req: Request, res: Response): Promise<Response> => {
      const data = await etl.run();
      return res.status(200).send(data);
    }
  )
);

export default router;
