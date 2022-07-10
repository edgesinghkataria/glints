import sequelizeConn from '../Database';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import OrderHistoryModel from './OrderHistoryModel';

export default class RestaurantModel extends Model<
  InferAttributes<RestaurantModel>,
  InferCreationAttributes<RestaurantModel>
> {
  declare id: number;
  declare name: string;
  declare updatedAt: Date;
  declare createdAt: Date;
}

RestaurantModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
    },
    openingHours: {
      type: new DataTypes.NUMBER(),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'restaurant',
    sequelize: sequelizeConn.getInstance(),
  }
);

RestaurantModel.hasMany(OrderHistoryModel);
