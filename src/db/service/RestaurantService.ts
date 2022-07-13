import RestaurantModel from '../model/RestaurantModel';
import DishModel from '../model/DishModel';
import OpeningHoursModel from '../model/OpeningHoursModel';
import {Op} from 'sequelize';

export interface GetDishesByPriceRangeInput {
  startPrice: number;
  endPrice: number;
}

export interface searchRestaurantsByName {
  searchText: string;
}

export interface GetDishesByPriceRangeInput {
  startPrice: number;
  endPrice: number;
  limit: number;
  offset: number;
}

export interface getRestaurantScheduleInput {
  openingTime: number;
  closingTime: number;
  limit: number;
  offset: number;
}

export default class RestaurantService {
  async getDishesByPriceRange(queryData: GetDishesByPriceRangeInput) {
    return DishModel.findAll({
      where: {
        price: {[Op.gte]: queryData.startPrice, [Op.lte]: queryData.endPrice},
      },
      limit: queryData.limit,
      offset: queryData.offset,
      order: [['dishName', 'ASC']],
    });
  }
  async searchRestaurantsByName(queryData: searchRestaurantsByName) {
    return RestaurantModel.findAll({
      where: {
        restaurantName: {[Op.like]: `%${queryData.searchText}%`},
      },
      order: [['restaurantName', 'ASC']],
    });
  }

  async getRestaurantsByName(name: string) {
    return RestaurantModel.findOne({
      where: {
        restaurantName: name,
      },
    });
  }

  async getDishByNameAndRestaurantId(
    name: string,
    restaurantId: number
  ): Promise<DishModel | null> {
    return DishModel.findOne({
      where: {
        dishName: name,
        restaurantId: restaurantId,
      },
    });
  }

  async getRestaurantSchedule(queryData: getRestaurantScheduleInput) {
    const where = {
      openingTime: {[Op.gte]: queryData.openingTime},
      closingTime: {[Op.lte]: queryData.closingTime},
    };
    return OpeningHoursModel.findAll({
      where,
      limit: queryData.limit,
      offset: queryData.offset,
      include: [
        {
          model: RestaurantModel,
          as: 'restaurantInfo',
          attributes: ['restaurantName'],
        },
      ],
    });
  }
}
