import RestaurantService from '../../db/service/RestaurantService';
import UserService from '../../db/service/UserService';

export default class RestaurantController {
  private userService: UserService = new UserService();
  private restaurantService: RestaurantService = new RestaurantService();

  // static getOpenRestaurants(req, res): void {
  //   try {
  //   } catch (error) {}
  // }

  // static searchRestaurantsByName(req, res): void {
  //   try {
  //   } catch (error) {}
  // }

  // static searchDishesByName(req, res): void {
  //   try {
  //   } catch (error) {}
  // }
}
