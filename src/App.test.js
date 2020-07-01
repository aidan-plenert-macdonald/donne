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
  const { getByText, getByLabelText} = render(<App />);
  await waitFor(() => getByText("Present Tense"));

  expect(getByLabelText("minä")).toBeInTheDocument();
  expect(getByLabelText("sinä")).toBeInTheDocument();
  expect(getByLabelText("hän")).toBeInTheDocument();
  expect(getByLabelText("me")).toBeInTheDocument();
  expect(getByLabelText("te")).toBeInTheDocument();
  expect(getByLabelText("he")).toBeInTheDocument();
});
