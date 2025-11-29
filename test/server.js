const request = require('supertest');
const app = require('../server');

describe('Bug Tracker API', () => {
  beforeEach(() => {
    // Reset bugs array before each test
    app.locals.bugs = [];
    app.locals.nextId = 1;
  });

  test('GET /api/bugs should return all bugs', async () => {
    const response = await request(app).get('/api/bugs');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/bugs should create a new bug', async () => {
    const response = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test bug', description: 'Test description' });
    
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test bug');
    expect(response.body.status).toBe('open');
  });

  test('PUT /api/bugs/:id should update a bug', async () => {
    const createResponse = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test bug', description: 'Test' });
    
    const updateResponse = await request(app)
      .put(`/api/bugs/${createResponse.body.id}`)
      .send({ status: 'resolved' });
    
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.status).toBe('resolved');
  });

  test('DELETE /api/bugs/:id should delete a bug', async () => {
    const createResponse = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test bug', description: 'Test' });
    
    const deleteResponse = await request(app)
      .delete(`/api/bugs/${createResponse.body.id}`);
    
    expect(deleteResponse.status).toBe(204);
  });
});