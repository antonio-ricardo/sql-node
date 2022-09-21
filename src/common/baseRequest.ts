export interface BaseRequest<T> {
  body: T;
  headers?: Record<string, unknown>;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
}
