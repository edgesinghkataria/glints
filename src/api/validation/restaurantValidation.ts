import {z} from 'zod';

class restaurantValidation {
  getRestaurantsByOpeningTime(data: any) {
    const schema = z.object({
      openTime: z.date(),
      closeTime: z.date(),
    });
    schema.parse(data);
  }
  getDishesByPriceRange(data: any) {
    const schema = z.object({
      dishCount: z.number(),
      minPrice: z.date(),
      maxTime: z.date(),
    });
    schema.parse(data);
  }
  searchRestaurantsByName(data: any) {
    const schema = z.object({
      searchText: z.string(),
    });
    schema.parse(data);
  }
}

export default new restaurantValidation();
