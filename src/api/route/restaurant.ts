import {Router} from 'express';
import RestaurantController from '../controller/RestaurantController';

const categoriesRouter = Router();

categoriesRouter.get('/', RestaurantController.getRestaurantsByOpeningTime);

categoriesRouter.get('/dish', RestaurantController.getDishesByPriceRange);

categoriesRouter.get('/search', RestaurantController.searchRestaurantsByName);

export default categoriesRouter;
