import {Router} from 'express';
import RestaurantController from '../controller/RestaurantController';

const restaurantRouter = Router();

restaurantRouter.get('/dish', RestaurantController.getDishesByPriceRange);

restaurantRouter.get('/search', RestaurantController.searchRestaurantsByName);

restaurantRouter.get('/schedule', RestaurantController.getRestaurantSchedule);

export default restaurantRouter;
