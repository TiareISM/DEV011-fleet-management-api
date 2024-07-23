const request = require('supertest');
const app = require('../index');
const db = require('../src/database/db');

// Mock para evitar consultas reales a la base de datos
jest.mock('../src/database/db', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('GET /api/taxis', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  it('should return a list of taxis', async () => {
    // Mock de la respuesta de la DB
    db.pool.query.mockResolvedValueOnce({
      rows: [
        { id: 1, plate: 'ABC123' },
        { id: 2, plate: 'XYZ789' },
      ],
    });

    const res = await request(app).get('/api/taxis?page=1&limit=10');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('plate');
  });

  it('should return 400 for invalid query parameters', async () => {
    const res = await request(app).get('/api/taxis?page=invalid&limit=10');
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Invalid query parameters');
  });
});

describe('GET /api/taxis/:id/locations', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  it('should return locations for a specific taxi', async () => {
    // Mock de la respuesta de la DB
    db.pool.query.mockResolvedValueOnce({
      rows: [
        {
          date: '2008-02-02T17:22:40.000Z',
          latitude: 116.30508,
          longitude: 39.96525,
        },
        {
          date: '2008-02-02T17:25:54.000Z',
          latitude: 116.3043,
          longitude: 39.9622,
        },
      ],
    });

    const res = await request(app).get(
      '/api/taxis/1/locations?date=2008-02-02&page=1&limit=10'
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('date');
    expect(res.body[0]).toHaveProperty('latitude');
    expect(res.body[0]).toHaveProperty('longitude');
  });

  it('should return 404 for a taxi with no locations', async () => {
    // Mock para simular que no se encuentran ubicaciones
    db.pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).get(
      '/api/taxis/1/locations?date=2008-02-02&page=1&limit=10'
    );
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(
      'No locations found for the given taxi ID and date'
    );
  });

  it('should return 400 for invalid query parameters', async () => {
    const res = await request(app).get(
      '/api/taxis/1/locations?date=2008-02-02&page=invalid&limit=10'
    );
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Invalid query parameters');
  });
});

describe('GET /api/taxis/:id/location/latest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return locations for a specific taxi with valid parameters', async () => {
    // Mock de la respuesta de la DB
    db.pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 7088,
          plate: 'HDBL-4695',
          latitude: 117.11593,
          longitude: 40.1541,
          date: '2008-02-08T15:14:46.000Z',
        },
      ],
    });

    const res = await request(app).get(
      '/api/taxis/7088/location/latest?limit=10&page=1'
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('id', 7088);
    expect(res.body[0]).toHaveProperty('plate', 'HDBL-4695');
    expect(res.body[0]).toHaveProperty('latitude', 117.11593);
    expect(res.body[0]).toHaveProperty('longitude', 40.1541);
    expect(res.body[0]).toHaveProperty('date', '2008-02-08T15:14:46.000Z');
  });

  it('should return 400 for invalid taxi ID', async () => {
    const res = await request(app).get(
      '/api/taxis/invalid/location/latest?limit=10&page=1'
    );
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Invalid taxi Id');
  });

  it('should return 400 for invalid query parameters', async () => {
    const res = await request(app).get(
      '/api/taxis/7088/location/latest?limit=invalid&page=1'
    );
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Invalid query parameters');
  });

  it('should return 404 for a taxi with no locations', async () => {
    // Mock para simular que no se encuentran ubicaciones
    db.pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).get(
      '/api/taxis/7088/location/latest?limit=10&page=1'
    );
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe('No locations found for taxi');
  });

  it('should handle errors from the database', async () => {
    // Mock para simular un error de la base de datos
    db.pool.query.mockRejectedValueOnce(new Error('Database error'));

    const res = await request(app).get(
      '/api/taxis/7088/location/latest?limit=10&page=1'
    );
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toBe('Internal Server Error');
  });
});
