import sequelizeConn from '../Database';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';

export default class RestaurantModel extends Model<
  InferAttributes<RestaurantModel>,
  InferCreationAttributes<RestaurantModel>
> {
  declare id: number;
  declare restaurantName: string;
  declare cashBalance: number;
  declare updatedAt: Date;
  declare createdAt: Date;
  declare dataValues?: any;
}

RestaurantModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      // autoIncrement: true,
      primaryKey: true,
    },
    restaurantName: {
      type: new DataTypes.TEXT(),
    },
    cashBalance: {
      type: new DataTypes.DOUBLE(),
    },
    createdAt: {
      type: DataTypes.DATE(),
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE(),
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'restaurant',
    sequelize: sequelizeConn.getInstance(),
  }
);

RestaurantModel.sync({alter: true});
