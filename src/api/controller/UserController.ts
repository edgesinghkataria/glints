import {Request, Response} from 'express';
import UserService from '../../db/service/UserService';
import userValidation from '../validation/userValidation';
import RestaurantService from '../../db/service/RestaurantService';
import restaurantValidation from '../validation/restaurantValidation';
import responseHelper from '../responseHelper';

export default class UserController {
  private static userService: UserService = new UserService();

  static async placeOrder(req: Request, res: Response): Promise<void> {
    try {
      const data = userValidation.placeOrder(req.body);

      const responseData = await UserController.userService.placeOrder(data);
      responseHelper.sendOK(res, responseData);
    } catch (error) {
      console.error(error);
      responseHelper.sendError(res, error);
    }
  }
}
