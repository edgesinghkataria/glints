import {Request, Response} from 'express';
import UserService from '../../db/service/UserService';
import userValidation from '../validation/userValidation';

export default class UserController {
  userService: UserService = new UserService();

  static placeOrder(req: Request, res: Response): void {
    try {
      const data = userValidation.placeOrder(req.body);
    } catch (error) {
      console.error(error);
    }
  }
}
