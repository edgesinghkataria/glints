import express, {Application, Request, Response} from 'express';
import route from '../api/route';
import morgan from 'morgan';

export default class Express {
  private static _instance: Application;
  static readonly PORT = process.env.PORT;

  static initialize(): Promise<Application> {
    return new Promise<Application>((resolve, reject) => {
      try {
        if (!this._instance) this._instance = express();

        this._instance.use(morgan('tiny'));
        this._instance.use(express.json());
        this._instance.use(express.urlencoded({extended: true}));
        this._instance.disable('x-powered-by');

        this._instance.get(
          '/',
          async (req: Request, res: Response): Promise<Response> => {
            return res.status(200).send({
              message: `Welcome to the glints API! \n Endpoints available at http://localhost:${this.PORT}/api/v1`,
            });
          }
        );

        this._instance.use('/api/v1', route);

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
