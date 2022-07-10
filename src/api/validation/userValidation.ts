import {z} from 'zod';

class UserValidation {
  placeOrder(data: any) {
    const schema = z.object({
      userId: z.number(),
      dishId: z.number(),
      restaurantId: z.number(),
    });
    return schema.parse(data);
  }
}

export default new UserValidation();
