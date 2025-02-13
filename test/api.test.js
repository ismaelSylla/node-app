const request = require('supertest');
const app = require('../app'); // Assurez-vous que votre fichier principal s'appelle `app.js` et exporte `app`

describe('API Tests', () => {
  test('GET /users should return a list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /users should create a new user', async () => {
    const newUser = { name: "Alice", age: 10 };
    const response = await request(app).post('/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
  });

  test('GET /users/:id should return user details', async () => {
    const response = await request(app).get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  test('PUT /users/:id should update user data', async () => {
    const updatedUser = { name: "Alice Updated", age: 16 };
    const response = await request(app).put('/users/1').send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);
  });

  test('DELETE /users/:id should remove a user', async () => {
    const response = await request(app).delete('/users/1');
    expect(response.status).toBe(200); // No content
  });
  afterAll(async () => {
    if (app && app.close) {
        app.close();
    }
});
});


