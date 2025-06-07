import request from 'supertest';
const app = require('../server.js');

describe('POST /classify-url', () => {
  it('should return analysis and report for a valid URL', async () => {
    const response = await request(app)
      .post('/classify-url')
      .send({ url: 'https://example.com' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('analysis');
    expect(response.body).toHaveProperty('report');
  });

  it('should return 400 for missing URL', async () => {
    const response = await request(app)
      .post('/classify-url')
      .send({});
    expect(response.statusCode).toBe(400);
  });
});