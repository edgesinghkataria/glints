import {Sequelize, Dialect} from 'sequelize';

class Database {
  private static readonly dbName = process.env.DB_NAME as string;
  private static readonly dbUser = process.env.DB_USER as string;
  private static readonly dbPassword = process.env.DB_PASSWORD as string;
  private static readonly dbHost = process.env.DB_HOST as string;
  private static readonly dbDriver = process.env.DB_DRIVER as Dialect;
  private static _instance: Sequelize;
  private constructor() {}

  static intialize() {
    if (!this._instance) {
      this._instance = new Sequelize(
        this.dbName,
        this.dbUser,
        this.dbPassword,
        {
          host: this.dbHost,
          dialect: this.dbDriver,
          logging: false,
          pool: {
            max: 1,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        }
      );
    }
    return this._instance;
  }
  static getInstance(): Sequelize {
    if (!this._instance) this.intialize();
    return this._instance;
  }
  static async sync() {
    const instance = this._instance;
    try {
      await instance.sync();
    } catch (error) {
      console.error(error, ' eeororisf');
    }
  }
}

export default Database;
