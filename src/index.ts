import type {Middleware} from './types';

/**
 * Fetch Middleware class that will run request and response middleware functions.
 */
export default class FetchMiddleware {
  /**
   * Middelwares middleware wrapper that will be executed sequentially
   * @param url Fetch API url.
   * @param options Fetch API request options.
   */
  protected middelwares = (url: string, options: RequestInit) =>
    fetch(url, options);
  /**
   * Default Fetch API request options.
   */
  protected options: RequestInit = {};
  /**
   * Fetch API url.
   */
  protected domain: string;

  /**
   * Initializes the FetchMiddleware class with a domain and default options.
   * @param {string} domain URL domain for the Fetch API.
   * @param {RequestInit} options Fetch API default request init options
   */
  constructor(domain: string, options: RequestInit) {
    this.domain = domain;
    this.options = options;
  }

  /**
   * Initiates the chained middleware functions - the base middleware function is the Fetch API request.
   * @param {string} url Constructed URL utilized for Fetch API.
   * @param {RequestInit} options Combined default options + request specific options.
   * @returns {Promise<Response>} Fetch API response.
   */
  private run(url: string, options: RequestInit) {
    return this.middelwares(url, options);
  }

  /**
   * Wraps base middleware or middlewares with another middleware function
   * @param {Middleware} middleware Pre and post middleware function to manipulate Fetch API request / response.
   */
  public use(middleware: Middleware) {
    this.middelwares = middleware(this.middelwares);
  }

  /**
   * Fetch API request with URL path and request specific options.
   * @param {string} path URL path.
   * @param {RequestInit} options Fetch API request specific options.
   * @returns {Promise<Response>} Fetch API response.
   */
  public request(path: string, options: RequestInit) {
    const url = new URL(path, this.domain);

    return this.run(url.href, {...this.options, ...options});
  }
}

export * from './types';

export * as middleware from './middleware';
