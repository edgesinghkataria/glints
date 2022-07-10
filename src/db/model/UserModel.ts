import sequelizeConn from '../Database';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import OrderHistoryModel from './OrderHistoryModel';

export default class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id: number;
  declare name: string;
  declare updatedAt: Date;
  declare createdAt: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'user',
    sequelize: sequelizeConn.getInstance(),
  }
);

UserModel.hasMany(OrderHistoryModel);
