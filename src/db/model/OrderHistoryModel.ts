import sequelizeConn from '../Database';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';

export default class OrderHistoryModel extends Model<
  InferAttributes<OrderHistoryModel>,
  InferCreationAttributes<OrderHistoryModel>
> {
  declare id?: number;
  declare userId: number;
  declare restaurantId: number;
  declare restaurantName?: string;
  declare dishName?: string;
  declare amount: number;
  declare dishId: number;
  declare updatedAt?: Date;
  declare createdAt?: Date;
}

OrderHistoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: new DataTypes.INTEGER(),
    },
    restaurantId: {
      type: new DataTypes.INTEGER(),
    },
    dishId: {
      type: new DataTypes.INTEGER(),
    },
    restaurantName: {
      type: new DataTypes.TEXT(),
    },
    dishName: {
      type: new DataTypes.TEXT(),
    },
    amount: {
      type: new DataTypes.INTEGER(),
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
    tableName: 'orderHistory',
    sequelize: sequelizeConn.getInstance(),
    indexes: [{unique: true, fields: ['restaurantId', 'userId']}],
  }
);

OrderHistoryModel.sync({alter: true});
