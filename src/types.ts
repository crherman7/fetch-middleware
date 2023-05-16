export type MiddlewareFunc = (
  url: string,
  options: RequestInit,
) => Promise<Response>;

export type Middleware = (next: MiddlewareFunc) => MiddlewareFunc;
