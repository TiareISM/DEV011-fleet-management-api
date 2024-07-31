/*const { loadTrajectoriesData } = require('../src/scripts/loadTrajectoriesData');
const fs = require('node:fs');
const path = require('node:path');
const { pool } = require('../src/database/db');

jest.mock('../src/database/db'); // Simulamos db.pool.query

describe('loadTrajectoriesData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle empty file', async () => {
    // Simulamos un archivo vacío
    fs.readFileSync = jest.fn().mockReturnValue('');

    await loadTrajectoriesData();

    expect(pool.query).not.toHaveBeenCalled(); // Verificamos que no se ejecutó ninguna consulta
  });

  it('should handle invalid taxi_id', async () => {
    // Simulamos un archivo con un taxi_id inválido
    fs.readFileSync = jest.fn().mockReturnValue('invalid,date,lat,lon');

    await loadTrajectoriesData();

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('ID de taxi inválido')
    );
    expect(pool.query).not.toHaveBeenCalled();
  });

  it('should handle non-existent taxi_id', async () => {
    // Simulamos un archivo con un taxi_id que no existe
    fs.readFileSync = jest.fn().mockReturnValue('1,date,lat,lon');
    pool.query.mockResolvedValueOnce({ rowCount: 0 }); // Simulamos que el taxi_id no existe

    await loadTrajectoriesData();

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('El taxi_id no existe')
    );
    expect(pool.query).toHaveBeenCalledTimes(2); // Una vez para verificar existencia, otra para insertar
  });
}); */
