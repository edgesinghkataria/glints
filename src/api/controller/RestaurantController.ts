import {Request, Response} from 'express';
import RestaurantService from '../../db/service/RestaurantService';
import UserService from '../../db/service/UserService';
import restaurantValidation from '../validation/restaurantValidation';
import responseHelper from '../responseHelper';

export default class RestaurantController {
  private static userService: UserService = new UserService();
  private static restaurantService = new RestaurantService();

  static getRestaurantsByOpeningTime(req: Request, res: Response): void {
    try {
      const data = restaurantValidation.getRestaurantsByOpeningTime(req.query);

      const responseData =
        this.restaurantService.getRestaurantsByOpeningTime(data);
      responseHelper.sendOK(req, responseData);
    } catch (error) {
      responseHelper.sendError(req, error);
    }
  }

  static getDishesByPriceRange(req: Request, res: Response): void {
    try {
      const data = restaurantValidation.getDishesByPriceRange(req.query);
      const responseData = this.restaurantService.getDishesByPriceRange(data);
      responseHelper.sendOK(req, responseData);
    } catch (error) {
      responseHelper.sendError(req, error);
    }
  }

  static searchRestaurantsByName(req: Request, res: Response): void {
    try {
      const data = restaurantValidation.searchRestaurantsByName(req.query);
      const responseData = this.restaurantService.searchRestaurantsByName(data);
      responseHelper.sendOK(req, responseData);
    } catch (error) {
      responseHelper.sendError(req, error);
    }
  }
}
