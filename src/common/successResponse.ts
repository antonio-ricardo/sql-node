import { BaseResponse } from './baseResponse';

export class SuccessResponse {
  static create(body: unknown): BaseResponse {
    return {
      body,
      status: 200,
    };
  }
}
