import sequelizeConn from '../Database';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';

export default class UserAccountModel extends Model<
  InferAttributes<UserAccountModel>,
  InferCreationAttributes<UserAccountModel>
> {
  declare id: number;
  declare userId: number;
  declare cashBalance: number;
  // can add other types of balance
  declare updatedAt: Date;
  declare createdAt: Date;
}

UserAccountModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: new DataTypes.NUMBER(),
    },
    cashBalance: {
      type: new DataTypes.NUMBER(),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'userAccount',
    sequelize: sequelizeConn.getInstance(),
    indexes: [{unique: true, fields: ['restaurantId']}],
  }
);
