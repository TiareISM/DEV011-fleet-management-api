const request = require('supertest');
const app = require('../index.js');

describe('GET /api/taxis', () => {
  it('should return a list of taxis', async () => {
    const res = await request(app).get('/api/taxis?page=1&limit=10'); // Simula una solicitud GET a la ruta /api/taxis
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array); // Verifica que la respuesta sea un array
  });

  it('should return 400 for invalid query parameters', async () => {
    const res = await request(app).get('/api/taxis?page=invalid&limit=10'); // Simula una solicitud GET con parámetros no válidos
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Invalid query parameters');
  });
});
