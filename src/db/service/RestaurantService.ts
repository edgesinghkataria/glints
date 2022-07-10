import RestaurantModel from '../model/RestaurantModel';
export default class RestaurantService {
  // restaurantModel: RestaurantModel = new RestaurantModel();

  private readonly queryRestaurantsByOpeningTime: string =
    'SELECT * FROM restaurant';

  // getRestaurantsByOpeningTime(from: Date, to: Date) {
  //   RestaurantModel.create();
  // }
}
