const supertest = require('supertest');
const app = require('../../server');

describe('POST /auth/login', () => {
  beforeAll(() => {
    console.log('beforeAll');
  });
  beforeEach(() => {
    console.log('beforeEach');
  });
  afterAll(async () => {
    console.log('afterAll');
  });
  afterEach(() => {
    console.log('afterEach');
  });

  it('should return user token and status code 200', async () => {
    const testData = {
      email: 'ted@example.com',
      password: 'Ted12345&xfjxfgxft',
    };

    const response = await supertest(app)
      .post('/api/v1/auth/login')
      .send(testData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      })
    );
  });

  it('should return unauthorized error', async () => {
    const testData = {
      email: 'nata@example.com',
      password: 'Nata12345',
    };
    const response = await supertest(app)
      .post('/api/v1/auth/login')
      .send(testData);

    expect(response.statusCode).toBe(401);
  });
});
