import {Request, Response} from 'express';
import RestaurantService from '../../db/service/RestaurantService';
import UserService from '../../db/service/UserService';
import restaurantValidation from '../validation/restaurantValidation';
import responseHelper from '../responseHelper';
import {
  GetDishesByPriceRangeInput,
  searchRestaurantsByName,
  getRestaurantScheduleInput,
} from '../../db/service/RestaurantService';

export default class RestaurantController {
  private static userService: UserService = new UserService();
  private static restaurantService = new RestaurantService();

  static async getDishesByPriceRange(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data: GetDishesByPriceRangeInput =
        restaurantValidation.getDishesByPriceRange(req.query);
      const responseData =
        await RestaurantController.restaurantService.getDishesByPriceRange(
          data
        );
      responseHelper.sendOK(res, responseData);
    } catch (error) {
      console.error(error);
      responseHelper.sendError(res, error);
    }
  }

  static async searchRestaurantsByName(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data: searchRestaurantsByName =
        restaurantValidation.searchRestaurantsByName(req.query);
      const responseData =
        await RestaurantController.restaurantService.searchRestaurantsByName(
          data
        );
      responseHelper.sendOK(res, responseData);
    } catch (error) {
      console.error(error);
      responseHelper.sendError(res, error);
    }
  }

  static async getRestaurantSchedule(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data: getRestaurantScheduleInput =
        restaurantValidation.getRestaurantSchedule(req.query);
      const responseData =
        await RestaurantController.restaurantService.getRestaurantSchedule(
          data
        );
      responseHelper.sendOK(res, responseData);
    } catch (error) {
      console.error(error);
      responseHelper.sendError(res, error);
    }
  }
}
