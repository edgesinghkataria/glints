import UserModel from '../model/UserModel';
import OrderHistoryModel from '../model/OrderHistoryModel';
import RestaurantModel from '../model/RestaurantModel';

export default class UserService {
  restaurantModel: RestaurantModel = new RestaurantModel();
  orderHistoryModel: OrderHistoryModel = new OrderHistoryModel();
  userModel: UserModel = new UserModel();

  placeOrder(mobileNumber: string) {
    return UserModel.findOne({
      where: {
        name: mobileNumber,
      },
    });
  }
}
