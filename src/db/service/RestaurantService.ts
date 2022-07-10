import RestaurantModel from '../model/RestaurantModel';
import DishModel from '../model/DishModel';
import OpeningHoursModel from '../model/OpeningHoursModel';

export default class RestaurantService {
  restaurantModel: RestaurantModel = new RestaurantModel();
  dishModel: DishModel = new DishModel();
  openingHoursModel: OpeningHoursModel = new OpeningHoursModel();

  private readonly queryRestaurantsByOpeningTime: string =
    'SELECT * FROM restaurant';

  getRestaurantsByOpeningTime(queryData: any) {
    // RestaurantModel.create();
  }
  getDishesByPriceRange(queryData: any) {
    // RestaurantModel.create();
  }
  searchRestaurantsByName(queryData: any) {
    // RestaurantModel.create();
  }
}
