import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import testPost from '../testData/testPost';
import { expect, test, beforeAll, afterAll, describe, it } from 'vitest'

import app from '../../app';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /post/create', () => {
  it('should return status 403', async () => {
    const newPost = testPost;

    await request(app)
      .post('/post/create')
      .send(newPost)
      .expect(403)
  });
});
