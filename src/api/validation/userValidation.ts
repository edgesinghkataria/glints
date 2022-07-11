import {z} from 'zod';
import {PlaceOrderInput} from '../../db/service/UserService';

class UserValidation {
  placeOrder(data: any): PlaceOrderInput {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        data[key] = Number(value);
      }
    }
    const schema = z.object({
      userId: z.number(),
      dishId: z.number(),
      restaurantId: z.number(),
    });
    return schema.parse(data);
  }
}

export default new UserValidation();
