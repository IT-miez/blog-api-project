import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import testPost from '../testData/testPost';
import testUser from '../testData/testUser';
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

describe('POST /post/create, no posting without login', () => {
  it('should return status 403', async () => {
    const newPost = testPost;

    await request(app)
      .post('/post/create')
      .send(newPost)
      .expect(403)
  });
});

describe('GET /user/login', () => {
  it('should return status 200', async () => {
    const newAccount = [];
    newAccount.push(testUser)
    await User.insertMany(newAccount)

    const newAccount_plaintext = testUser_plaintext
    console.log(newAccount_plaintext)
    console.log(newAccount[0])

    const response = await request(app)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(newAccount_plaintext)
    
    expect(response.status).toEqual(200)
    expect(response.body.token)

    console.log()

  });
});

describe('POST /user/login + /post/create', () => {
  it('should be able to create a post after login, status 200', async () => {

    const newAccount_plaintext = testUser_plaintext
    const loginResponse = await request(app)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(newAccount_plaintext)
    expect(loginResponse.status).toEqual(200)

    const token = loginResponse.body.token
    const newPost = testPost;

    const response = await request(app)
      .post('/post/create')
      .send(newPost)
      .set('Authorization', 'Bearer '+token)
    expect(response.status).toEqual(200)
  });

});
