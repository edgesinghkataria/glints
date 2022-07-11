import UserModel from '../model/UserModel';
import OrderHistoryModel from '../model/OrderHistoryModel';
import RestaurantModel from '../model/RestaurantModel';
import DishModel from '../model/DishModel';
import Sequelize, {Transaction, Op} from 'sequelize';
import Database from '../Database';
import Exceptions from '../../exception';

export interface PlaceOrderInput {
  userId: number;
  dishId: number;
  restaurantId: number;
}

export default class UserService {
  async placeOrder(inputData: PlaceOrderInput) {
    const {userId, restaurantId, dishId} = inputData;
    const findUserPromise = UserModel.findOne({
      where: {id: userId},
    });
    const findRestaurantPromise = RestaurantModel.findOne({
      where: {id: restaurantId},
    });
    const findDishPromise = DishModel.findOne({
      where: {id: dishId, restaurantId},
    });
    const findList = await Promise.all([
      findUserPromise,
      findRestaurantPromise,
      findDishPromise,
    ]);

    const [userData, restaurantData, dishData] = findList;

    if (!dishData || !restaurantData || !userData)
      throw new Exceptions.InvalidParameterException();
    if (userData.cashBalance < dishData.price)
      throw new Exceptions.InsufficientFundsException();

    const orderPrice = dishData.price;

    return Database.getInstance().transaction(
      async (t: Sequelize.Transaction) => {
        await OrderHistoryModel.create(
          {
            userId: userId,
            restaurantId: restaurantId,
            dishId: dishId,
            amount: orderPrice,
          },
          {transaction: t}
        );

        await userData.decrement('cashBalance', {
          by: orderPrice,
          transaction: t,
        });
        await restaurantData.increment('cashBalance', {
          by: orderPrice,
          transaction: t,
        });
      }
    );
  }
}
