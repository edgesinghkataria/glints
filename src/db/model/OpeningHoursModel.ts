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
  declare restaurantId: number;
  declare openingHours: Date;
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
    restaurantId: {
      type: new DataTypes.NUMBER(),
    },
    openingHours: {
      type: new DataTypes.DATE(),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'restaurant',
    sequelize: sequelizeConn.getInstance(),
    indexes: [{unique: true, fields: ['restaurantId', 'openingHours']}],
  }
);
