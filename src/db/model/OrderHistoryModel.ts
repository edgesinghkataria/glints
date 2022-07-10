import sequelizeConn from '../Database';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';

export default class MenuModel extends Model<
  InferAttributes<MenuModel>,
  InferCreationAttributes<MenuModel>
> {
  declare id: number;
  declare userId: number;
  declare restaurantId: number;
  declare amount: number;
  declare dishId: number;
  declare price: number;
  declare status: string;
  declare updatedAt: Date;
  declare createdAt: Date;
}

MenuModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: new DataTypes.NUMBER(),
    },
    restaurantId: {
      type: new DataTypes.NUMBER(),
    },
    dishId: {
      type: new DataTypes.NUMBER(),
    },
    amount: {
      type: new DataTypes.NUMBER(),
    },
    price: {
      type: new DataTypes.NUMBER(),
    },
    status: {
      type: new DataTypes.ENUM('success', 'pending', 'failed'),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'menu',
    sequelize: sequelizeConn.getInstance(),
    indexes: [{unique: true, fields: ['restaurantId', 'userId']}],
  }
);
