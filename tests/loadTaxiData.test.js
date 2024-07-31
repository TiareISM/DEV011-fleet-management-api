const { loadTaxisData } = require('../src/scripts/loadTaxisData');
const fs = require('node:fs');
const path = require('node:path');
const { pool } = require('../src/database/db');

jest.mock('node:fs');
jest.mock('../src/database/db', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('loadTaxisData', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  it('should handle empty file', async () => {
    // Configura el mock para fs.readFileSync para devolver un archivo vacío
    fs.readFileSync.mockReturnValue('');

    // Mock para console.log
    console.log = jest.fn();

    await loadTaxisData();

    expect(pool.query).not.toHaveBeenCalled(); // No debería llamar a la base de datos
  });

  it('should handle invalid ID format', async () => {
    const mockData = 'ABC123,VALIDPLATE\n123,VALIDPLATE';
    fs.readFileSync.mockReturnValue(mockData);
    console.error = jest.fn();
    pool.query.mockResolvedValueOnce({ rows: [] }); // Mock para BEGIN

    await loadTaxisData();

    expect(console.error).toHaveBeenCalledWith('ID invaálido: ABC123');
    expect(pool.query).toHaveBeenCalledTimes(2); // BEGIN y COMMIT
  });

  it('should handle invalid plate format', async () => {
    const mockData = '123,INVALIDPLATE12345\n456,VALIDPLATE';
    fs.readFileSync.mockReturnValue(mockData);
    console.error = jest.fn();
    pool.query.mockResolvedValueOnce({ rows: [] }); // Mock para BEGIN

    await loadTaxisData();

    expect(console.error).toHaveBeenCalledWith(
      'Placa inválida: INVALIDPLATE12345'
    );
    expect(pool.query).toHaveBeenCalledTimes(2); // BEGIN y COMMIT
  });

  it('should handle database insertion error', async () => {
    const mockData = '123,VALIDPLATE';
    fs.readFileSync.mockReturnValue(mockData);
    pool.query.mockImplementationOnce(() =>
      Promise.reject(new Error('DB error'))
    ); // Mock para BEGIN
    pool.query.mockResolvedValueOnce({ rows: [] }); // Mock para ROLLBACK

    console.error = jest.fn();
    console.log = jest.fn();

    await loadTaxisData();

    expect(console.error).toHaveBeenCalledWith(
      'Error durante la carga de datos:',
      expect.any(Error)
    );
    expect(pool.query).toHaveBeenCalledWith('ROLLBACK');
  });
});
