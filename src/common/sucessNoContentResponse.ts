import { BaseResponse } from './baseResponse';

export class SuccessNoContentResponse {
  static create(): BaseResponse {
    return {
      body: { message: 'success' },
      status: 204,
    };
  }
}
