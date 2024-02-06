import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import testRegisterUser from '../testData/testRegisterUser';
import testRegisterUser_shortname from '../testData/testRegisterUser_shortname';
import testUser_plaintext from '../testData/testUser_plaintext';
import { expect, test, beforeAll, afterAll, describe, it } from 'vitest'

const User = require('../../models/user')

import app from '../../app';

let mongoServer;
let mongoose_connection;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);
  mongoose_connection = mongoose.connection;
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
        .send(testAccount)
       expect(response.status).toEqual(200)
    });
  });

  describe('POST /user/register', () => {
    it('should return status 400 + token', async () => {
      const testAccount = testRegisterUser_shortname;
      const response = await request(app)
        .post('/user/register')
        .send(testAccount)
       expect(response.status).toEqual(402)
    });
  });