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
  declare name: string;
  declare cashBalance: number;
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
    cashBalance: {
      type: new DataTypes.INTEGER(),
    },
    createdAt: DataTypes.DATE(),
    updatedAt: DataTypes.DATE(),
  },
  {
    tableName: 'restaurant',
    sequelize: sequelizeConn.getInstance(),
  }
);

RestaurantModel.sync();
