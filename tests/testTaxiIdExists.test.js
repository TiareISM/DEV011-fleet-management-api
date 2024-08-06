const { taxiIdExists } = require('../src/scripts/trajectoriesDataLoad');
const { pool } = require('../src/database/db');
jest.mock('../src/scripts/trajectoriesDataLoad', () => ({
  taxiIdExists: jest.fn(),
}));
jest.mock('../src/database/db', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('taxiIdExists', () => {
  beforeEach(() => {
    pool.query.mockClear();
    taxiIdExists.mockClear(); // Limpia los mocks para taxiIdExists
  });

  it('should return true if the taxi ID exists', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 42 }] });
    taxiIdExists.mockResolvedValueOnce(true); // Configura el mock para que devuelva true
    const exists = await taxiIdExists(42);
    expect(exists).toBe(true);
  });

  it('should return false if the taxi ID does not exist', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    taxiIdExists.mockResolvedValueOnce(false); // Configura el mock para que devuelva false
    const exists = await taxiIdExists(999);
    expect(exists).toBe(false);
  });
});
