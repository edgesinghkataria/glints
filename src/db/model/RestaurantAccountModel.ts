import sequelizeConn from '../Database';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';

export default class RestaurantAccountModel extends Model<
  InferAttributes<RestaurantAccountModel>,
  InferCreationAttributes<RestaurantAccountModel>
> {
  declare id: number;
  declare restaurantId: number;
  declare cashBalance: number;
  // can add other types of balance
  declare updatedAt: Date;
  declare createdAt: Date;
}

RestaurantAccountModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurantId: {
      type: new DataTypes.NUMBER(),
    },
    cashBalance: {
      type: new DataTypes.NUMBER(),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'restaurantAccount',
    sequelize: sequelizeConn.getInstance(),
    indexes: [{unique: true, fields: ['restaurantId']}],
  }
);
