import 'cross-fetch/polyfill';

import prisma from '../src/prisma';
import setupDB, { userOne } from './utils/db';
import getClient from './utils/getClient';
import { createUser, login, me, users } from './utils/operations';

const client = getClient();

const timeout = 20000;

beforeEach(setupDB, timeout);

test('Should create a new user', async () => {
  const variables = {
    data: { name: 'Deepak', email: 'test@test.com', password: '12345678' }
  };

  const { data } = await client.mutate({
    mutation: createUser,
    variables
  });

  const userExists = await prisma.exists.User({
    id: data.createUser.user.id
  });

  expect(userExists).toBe(true);
});

test('Should expose public author profiles', async () => {
  const { data } = await client.query({
    query: users
  });
  expect(data.users).toHaveLength(2);
  expect(data.users[0].email).toBeNull();
  expect(data.users[0].name).toBe('Jonny');
});

test('Should not login with bad credentials', async () => {
  const variables = {
    email: 'something@some.com',
    password: '736489932302'
  };

  await expect(
    client.mutate({
      mutation: login,
      variables
    })
  ).rejects.toThrow();
});

test('Should not signup with short password', async () => {
  const variables = {
    data: { name: 'alpha', email: 'something@some.com', password: '1234' }
  };

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

test('Should fetch user profile', async () => {
  const client = getClient(userOne.jwt);

  const { data } = await client.query({ query: me });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.email).toBe(userOne.user.email);
  expect(data.me.name).toBe(userOne.user.name);
});
