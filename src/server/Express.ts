import express, {Application} from 'express';

export default class Express {
  private static _instance: Application;
  static readonly PORT = process.env.PORT;

  static initialize(): Promise<Application> {
    return new Promise<Application>((resolve, reject) => {
      try {
        if (!this._instance) this._instance = express();

        this._instance.use(express.json());
        this._instance.use(express.urlencoded({extended: true}));
        this._instance.listen(this.PORT, () => {
          console.log(`Server running on port ${this.PORT}`);
        });

        resolve(this._instance);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
  static getInstance(): Application {
    return this._instance;
  }
}
