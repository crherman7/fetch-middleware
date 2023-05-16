import type {MiddlewareFunc} from '../types';

/**
 * Creates a middleware function that parses the response as JSON.
 *
 * @param {MiddlewareFunc} next - The next middleware function.
 * @returns {Function} A middleware function that returns a Promise resolving to the JSON response.
 */
const json = (next: MiddlewareFunc) => {
  /**
   * Middleware function that sends a request, waits for the response, and parses it as JSON.
   *
   * @param {string} url - The URL for the request.
   * @param {RequestInit} options - The options for the request.
   * @returns {Promise} A Promise resolving to the parsed JSON response.
   */
  return async (url: string, options: RequestInit) => {
    const res = await next(url, options);

    return res.json();
  };
};

export default json;
