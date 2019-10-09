import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import prisma from '../../src/prisma';

const userOne = {
  input: {
    name: 'Jonny',
    email: 'example@test.com',
    password: bcrypt.hashSync('12345678')
  },
  user: undefined,
  jwt: undefined
};

const userTwo = {
  input: {
    name: 'Deepak',
    email: 'rolling@test.com',
    password: bcrypt.hashSync('12345678')
  },
  user: undefined,
  jwt: undefined
};

const setupDB = async () => {
  // clear test db
  await prisma.mutation.deleteManyUsers();

  // create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, 'alphabetaomega');

  // create user two
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, 'alphabetaomega');
};

export { userOne, setupDB as default };
