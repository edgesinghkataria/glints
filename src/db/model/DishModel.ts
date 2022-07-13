import sequelizeConn from '../Database';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';

export default class DishModel extends Model<
  InferAttributes<DishModel>,
  InferCreationAttributes<DishModel>
> {
  declare id: number;
  declare dishName: string;
  declare restaurantId: number;
  declare price: number;
  declare updatedAt: Date;
  declare createdAt: Date;
  dataValues?: any;
}

DishModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dishName: {
      type: DataTypes.TEXT(),
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
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
    tableName: 'dish',
    sequelize: sequelizeConn.getInstance(),
  }
);
