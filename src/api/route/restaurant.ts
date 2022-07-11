import {Router} from 'express';
import RestaurantController from '../controller/RestaurantController';

const restaurantRouter = Router();

restaurantRouter.get('/', RestaurantController.getRestaurantsByOpeningTime);

restaurantRouter.get('/dish', RestaurantController.getDishesByPriceRange);

restaurantRouter.get('/search', RestaurantController.searchRestaurantsByName);

export default restaurantRouter;
