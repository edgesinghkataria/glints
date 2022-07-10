import {Request} from 'express';

export default class responseHelper {
  static sendOK(req: Request, data: any) {
    return {
      success: true,
      data,
    };
  }
  static sendError(req: Request, error: any, data?: any) {
    return {
      success: false,
      error,
      data,
    };
  }
}
