import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createCardsResponseMock } from './mocks/_mocks';

export const handlers = [
  http.post(
    'https://stapi.co/api/v1/rest/animal/search',
    async ({ request }) => {
      const body = await request.text();
      if (body === 'name=') {
        return HttpResponse.json(createCardsResponseMock(200, 10, false));
      }
      return HttpResponse.json(createCardsResponseMock(1, 10, true));
    },
  ),
];

export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
