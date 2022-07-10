import {Sequelize} from 'sequelize';

class Database {
  private static readonly dbName = process.env.DB_NAME as string;
  private static readonly dbUser = process.env.DB_USER as string;
  private static readonly dbHost = process.env.DB_HOST as string;
  private static readonly dbPassword = process.env.DB_PASSWORD as string;
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
          logging: false,
        }
      );
    }

    return this._instance;
  }
  static getInstance(): Sequelize {
    return this._instance;
  }
}

export default Database;
