import {Request, Response} from 'express';
import UserService from '../../db/service/UserService';

export default class UserController {
  userService: UserService = new UserService();

  // static placeOrder(req, res): void {
  //   try {
  //   } catch (error) {}
  // }
  // static create(req: Request, res: Response): void {
  //   try {

  //   } catch (error) {}
  // }
}
