import { BaseResponse } from "./baseResponse";

export class SuccessNoContentResponse {
  static create(body: unknown): BaseResponse {
    return {
      body,
      status: 204,
    };
  }
}
