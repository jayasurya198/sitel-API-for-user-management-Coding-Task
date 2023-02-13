import request from 'supertest';
import { Database } from '../src/database';
const app = require('../src/app');

const db = new Database();

describe('User API', () => {
  beforeAll(async () => {
    db.connect();
  });

  afterAll(async () => {
    db.close();
  });

  it('adds a user', async () => {
    const user = { name: 'test user', email: 'testuser@example.com', dob: '2000-01-01' };

    const response = await request(app).post('/users').send(user);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User added successfully.' });
  });

  it('fetchs a user', async () => {
    const user = { name: 'test user', email: 'testuser@example.com', dob: '2000-01-01' };
    db.addUser(user, (err) => {
      if (err) {
        console.log({ error: err.message });
      }
      console.log({ message: 'User added successfully.' });
    });

    const response = await request(app).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, ...user });
  });

  it('returns 404 if user is not found', async () => {
    const response = await request(app).get('/users/3');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'User not found.' });
  });

  it('deletes a user', async () => {
    const user = { name: 'test user', email: 'testuser@example.com', dob: '2000-01-01' };
    db.addUser(user, (err) => {
      if (err) {
        console.log({ error: err.message });
      }
      console.log({ message: 'User added successfully.' });
    });

    const response = await request(app).delete('/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User deleted successfully.' });
  });
});