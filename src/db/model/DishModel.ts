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
  declare price: number;
  declare updatedAt: Date;
  declare createdAt: Date;
}

DishModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    dishName: {
      type: new DataTypes.STRING(128),
    },
    price: {
      type: new DataTypes.INTEGER(),
    },
    createdAt: DataTypes.DATE(),
    updatedAt: DataTypes.DATE(),
  },
  {
    tableName: 'dish',
    sequelize: sequelizeConn.getInstance(),
  }
);

DishModel.sync();
