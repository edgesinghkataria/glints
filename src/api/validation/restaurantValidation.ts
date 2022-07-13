import {z} from 'zod';
import {
  GetDishesByPriceRangeInput,
  searchRestaurantsByName,
  getRestaurantScheduleInput,
} from '../../db/service/RestaurantService';
class restaurantValidation {
  getRestaurantsByOpeningTime(data: any) {
    const schema = z.object({
      openTime: z.date(),
      closeTime: z.date(),
    });
    schema.parse(data);
  }

  getDishesByPriceRange(data: any): GetDishesByPriceRangeInput {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        data[key] = Number(value);
      }
    }

    const schema = z.object({
      startPrice: z.number().positive(),
      endPrice: z.number().positive(),
      limit: z.number().positive(),
      offset: z.number().nonnegative(),
    });
    return schema.parse(data);
  }

  searchRestaurantsByName(data: any): searchRestaurantsByName {
    const schema = z.object({
      searchText: z.string(),
    });
    return schema.parse(data);
  }

  getRestaurantSchedule(data: any): getRestaurantScheduleInput {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        data[key] = Number(value);
      }
    }
    const schema = z.object({
      openingTime: z.number().lte(1440).gte(0),
      closingTime: z.number().lte(1440).gte(data.openingTime),
      limit: z.number().positive(),
      offset: z.number().nonnegative(),
    });
    return schema.parse(data);
  }
}

export default new restaurantValidation();
