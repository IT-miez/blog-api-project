import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {
  expect, test, beforeAll, afterAll, describe, it,
} from 'vitest';
import testRegisterUser from '../testData/testRegisterUser.json';
import testRegisterUserShortname from '../testData/testRegisterUserShortname.json';

import app from '../../app';

const User = require('../../models/user');

let mongoServer;
let mongooseConnection;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);
  mongooseConnection = mongoose.connection;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /user/register', () => {
  it('should return status 200 + token', async () => {
    const testAccount = testRegisterUser;
    const response = await request(app)
      .post('/user/register')
      .send(testAccount);
    expect(response.status).toEqual(200);
  });
});

describe('POST /user/register', () => {
  it('should return status 400 + token', async () => {
    const testAccount = testRegisterUserShortname;
    const response = await request(app)
      .post('/user/register')
      .send(testAccount);
    expect(response.status).toEqual(402);
  });
});
