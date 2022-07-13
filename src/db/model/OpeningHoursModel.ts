import sequelizeConn from '../Database';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import RestaurantModel from './RestaurantModel';
export default class OpeningHoursModel extends Model<
  InferAttributes<OpeningHoursModel>,
  InferCreationAttributes<OpeningHoursModel>
> {
  declare id: number;
  declare restaurantId: number;
  declare day: string;
  declare dayStringify: string;
  declare openingTime: Date;
  declare closingTime: Date;
  declare updatedAt: Date;
  declare createdAt: Date;
}

OpeningHoursModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurantId: {
      type: new DataTypes.INTEGER(),
    },
    day: {
      type: new DataTypes.TEXT(),
    },
    dayStringify: {
      type: new DataTypes.TEXT(),
    },
    //stroing openingTime(minutes) from midnight
    openingTime: {
      type: new DataTypes.INTEGER(),
    },
    //stroing closingTime time(minutes) from midnight
    closingTime: {
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
    tableName: 'openingHours',
    sequelize: sequelizeConn.getInstance(),
  }
);

OpeningHoursModel.belongsTo(RestaurantModel, {
  foreignKey: 'restaurantId',
  as: 'restaurantInfo',
});
RestaurantModel.hasMany(OpeningHoursModel, {
  foreignKey: 'restaurantId',
  as: 'restaurantInfo',
});
