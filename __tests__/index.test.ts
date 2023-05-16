import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

import Api, {middleware, MiddlewareFunc} from '../src';

describe('fetch-middleware', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('request', async () => {
    const api = new Api('http://example.org', {method: 'GET'});
    await api.request('/api/resource', {});

    const req = fetchMock.mock.calls[0];

    expect(req[0]).toBe('http://example.org/api/resource');
    expect(req[1]?.method).toBe('GET');
  });

  it('middleware', async () => {
    const before = jest.fn();
    const after = jest.fn();

    const api = new Api('http://example.org', {method: 'GET'});

    api.use(
      (next: MiddlewareFunc) => async (url: string, options: RequestInit) => {
        before();

        const res = await next(url, options);

        after();

        return res;
      },
    );

    await api.request('/api/resource', {});

    expect(before).toBeCalledTimes(1);
    expect(after).toBeCalledTimes(1);
  });

  it('response', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({foo: 'bar'}));

    const api = new Api('http://example.org', {method: 'GET'});
    api.use(middleware.json);
    const res = await api.request('/api/resource', {});

    expect(res).toEqual({foo: 'bar'});
  });
});
