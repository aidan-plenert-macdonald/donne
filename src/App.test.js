import React from 'react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor } from '@testing-library/react';
import App from './App';

import verbs from '../public/verbs.json';
import schema from '../public/verbs.schema.json';

const server = setupServer(
  rest.get(`${process.env.PUBLIC_URL}/verbs.schema.json`, (req, res, ctx) => {
    return res(ctx.json(schema))
  }),
  rest.get(`${process.env.PUBLIC_URL}/verbs.json`, (req, res, ctx) => {
    return res(ctx.json(verbs))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('has correct pronouns', async () => {
  const { getByText } = render(<App />);
  await waitFor(() => getByText("Present Tense"));

  expect(getByText("minä")).toBeInTheDocument();
  expect(getByText("sinä")).toBeInTheDocument();
  expect(getByText("hän")).toBeInTheDocument();
  expect(getByText("me")).toBeInTheDocument();
  expect(getByText("te")).toBeInTheDocument();
  expect(getByText("he")).toBeInTheDocument();
});
