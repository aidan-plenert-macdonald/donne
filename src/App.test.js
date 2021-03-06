import React from 'react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, fireEvent } from '@testing-library/react';
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
  const { getByText } = render(<App schema="verbs.schema.json" list="verbs.json" />);
  await waitFor(() => getByText("Present Tense"));

  expect(await waitFor(() => getByText("minä"))).toBeInTheDocument();
  expect(await waitFor(() => getByText("sinä"))).toBeInTheDocument();
  expect(await waitFor(() => getByText("hän"))).toBeInTheDocument();
  expect(await waitFor(() => getByText("me"))).toBeInTheDocument();
  expect(await waitFor(() => getByText("te"))).toBeInTheDocument();
  expect(await waitFor(() => getByText("he"))).toBeInTheDocument();
});

test('errors render', async () => {
  const { getByText, getAllByRole, getAllByText } = render(<App schema="verbs.schema.json" list="verbs.json" />);
  await waitFor(() => getByText("Present Tense"));

  fireEvent.click(getByText("Submit"));
  const errors = await waitFor(() => getAllByText(/Not correct/));
  const inputs = getAllByRole("input");

  expect(inputs).toHaveLength(6);
  expect(errors).toHaveLength(6);
});
