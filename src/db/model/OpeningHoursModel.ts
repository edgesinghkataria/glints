import sequelizeConn from '../Database';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';

export default class OpeningHoursModel extends Model<
  InferAttributes<OpeningHoursModel>,
  InferCreationAttributes<OpeningHoursModel>
> {
  declare id: number;
  declare restaurantId: number;
  declare openingTime: Date;
  declare closingTime: Date;
  declare updatedAt: Date;
  declare createdAt: Date;
}

OpeningHoursModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurantId: {
      type: new DataTypes.INTEGER(),
    },
    openingTime: {
      type: new DataTypes.DATE(),
    },
    closingTime: {
      type: new DataTypes.DATE(),
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
    tableName: 'openingHours',
    sequelize: sequelizeConn.getInstance(),
    indexes: [
      {unique: true, fields: ['restaurantId', 'openingTime', 'closingTime']},
    ],
  }
);

OpeningHoursModel.sync({alter: true});
