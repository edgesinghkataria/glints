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
  declare id: number;
  declare userId: number;
  declare restaurantId: number;
  declare amount: number;
  declare dishId: number;
  declare status: string;
  declare updatedAt: Date;
  declare createdAt: Date;
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
    amount: {
      type: new DataTypes.INTEGER(),
    },
    status: {
      type: new DataTypes.ENUM('success', 'pending', 'failed'),
    },
    createdAt: DataTypes.DATE(),
    updatedAt: DataTypes.DATE(),
  },
  {
    tableName: 'orderHistory',
    sequelize: sequelizeConn.getInstance(),
    indexes: [{unique: true, fields: ['restaurantId', 'userId']}],
  }
);

OrderHistoryModel.sync();
