/* eslint-disable no-unused-vars */
export class HttpError extends Error {
  constructor(
    public message: string,
    public status: number,
    public error: unknown = undefined
  ) {
    super(message);
  }
  public static BadRequest(message?: string, error?: unknown) {
    return new HttpError(message || "Bad Request", 400, error);
  }
  public static Unauthorized(message?: string, error?: unknown) {
    return new HttpError(message || "Unauthorized", 401, error);
  }

  public static Forbidden(message?: string, error?: unknown) {
    return new HttpError(message || "Forbidden", 403, error);
  }

  public static NotFound(message?: string, error?: unknown) {
    return new HttpError(message || "Not Found", 404, error);
  }

  public static MethodNotAllowed(message?: string, error?: unknown) {
    return new HttpError(message || "Method Not Allowed", 405, error);
  }

  public static Conflict(message?: string, error?: unknown) {
    return new HttpError(message || "Conflict", 409, error);
  }

  public static Internal(message?: string, error?: unknown) {
    return new HttpError(message || "Internal Server Error", 500, error);
  }

  public static NotImplemented(message?: string, error?: unknown) {
    return new HttpError(message || "Not Implemented", 501, error);
  }

  public static BadGateway(message?: string, error?: unknown) {
    return new HttpError(message || "Bad Gateway", 502, error);
  }

  public static ServiceUnavailable(message?: string, error?: unknown) {
    return new HttpError(message || "Service Unavailable", 503, error);
  }

  public static GatewayTimeout(message?: string, error?: unknown) {
    return new HttpError(message || "Gateway Timeout", 504, error);
  }
}
