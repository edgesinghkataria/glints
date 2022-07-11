import {Response} from 'express';

export default class responseHelper {
  static sendOK(res: Response, data: any) {
    res.status(200).send({
      success: true,
      data,
    });
  }
  static sendError(res: Response, error: any, data?: any) {
    res.status(400).send({
      success: false,
      error,
      data,
    });
  }
}
