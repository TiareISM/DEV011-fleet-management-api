const { loadTrajectoriesData } = require('../src/scripts/trajectoriesDataLoad');
const fs = require('node:fs');
const path = require('node:path');
const { pool } = require('../src/database/db');
const { taxiIdExists } = require('../src/scripts/taxiIdExists');

jest.mock('node:fs', () => ({
  readdirSync: jest.fn(),
  statSync: jest.fn(),
  readFileSync: jest.fn(),
}));

jest.mock('../src/database/db', () => ({
  pool: {
    query: jest.fn(),
  },
}));

jest.mock('node:path', () => {
  const originalPath = jest.requireActual('node:path');
  return {
    ...originalPath,
    join: jest.fn((...args) => originalPath.join(...args)),
    extname: jest.fn((...args) => originalPath.extname(...args)),
  };
});

jest.mock('../src/scripts/taxiIdExists', () => ({
  taxiIdExists: jest.fn(),
}));

describe('loadTrajectoriesData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load trajectories data successfully', async () => {
    const mockTrajectoriesDirPath = '/mock/path/to/trajectories';
    const mockFiles = ['file1.txt', 'file2.txt'];
    const mockFileData =
      '1,2023-01-01,40.7128,-74.0060\n2,2023-01-02,34.0522,-118.2437';

    path.join.mockReturnValue(mockTrajectoriesDirPath);
    path.extname.mockReturnValue('.txt');
    fs.readdirSync.mockReturnValue(mockFiles);
    fs.statSync.mockReturnValue({ isFile: () => true });
    fs.readFileSync.mockReturnValue(mockFileData);
    taxiIdExists.mockResolvedValue(true);
    pool.query.mockResolvedValue({});

    await loadTrajectoriesData();

    expect(fs.readdirSync).toHaveBeenCalledWith(mockTrajectoriesDirPath);
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join(mockTrajectoriesDirPath, 'file1.txt'),
      'utf-8'
    );
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join(mockTrajectoriesDirPath, 'file2.txt'),
      'utf-8'
    );
    expect(pool.query).toHaveBeenCalledWith('BEGIN');
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO trajectories (taxi_id, date, latitude, longitude) VALUES ($1, $2, $3, $4)',
      [1, '2023-01-01', 40.7128, -74.006]
    );
    expect(pool.query).toHaveBeenCalledWith('COMMIT');
  });

  it('should handle empty files correctly', async () => {
    const mockTrajectoriesDirPath = '/mock/path/to/trajectories';
    const mockFiles = ['file1.txt', 'file2.txt'];
    const mockFileData = '';

    path.join.mockReturnValue(mockTrajectoriesDirPath);
    fs.readdirSync.mockReturnValue(mockFiles);
    fs.statSync.mockReturnValue({ isFile: () => true });
    fs.readFileSync.mockReturnValue(mockFileData);
    taxiIdExists.mockResolvedValue(true);
    pool.query.mockResolvedValue({});

    await loadTrajectoriesData();

    expect(fs.readdirSync).toHaveBeenCalledWith(mockTrajectoriesDirPath);
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join(mockTrajectoriesDirPath, 'file1.txt'),
      'utf-8'
    );
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join(mockTrajectoriesDirPath, 'file2.txt'),
      'utf-8'
    );
    expect(pool.query).toHaveBeenCalledWith('BEGIN');
    expect(pool.query).toHaveBeenCalledWith('COMMIT');
  });

  it('should handle taxi ID not existing', async () => {
    const mockTrajectoriesDirPath = '/mock/path/to/trajectories';
    const mockFiles = ['file1.txt'];
    const mockFileData = '1,2023-01-01,40.7128,-74.0060';

    path.join.mockReturnValue(mockTrajectoriesDirPath);
    fs.readdirSync.mockReturnValue(mockFiles);
    fs.statSync.mockReturnValue({ isFile: () => true });
    fs.readFileSync.mockReturnValue(mockFileData);
    taxiIdExists.mockResolvedValue(false);
    pool.query.mockResolvedValue({});

    await loadTrajectoriesData();

    expect(fs.readdirSync).toHaveBeenCalledWith(mockTrajectoriesDirPath);
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join(mockTrajectoriesDirPath, 'file1.txt'),
      'utf-8'
    );
    expect(pool.query).toHaveBeenCalledWith('BEGIN');
    expect(pool.query).toHaveBeenCalledWith('COMMIT');
  });

  it('should handle errors during the load process', async () => {
    const mockTrajectoriesDirPath = '/mock/path/to/trajectories';
    const mockFiles = ['file1.txt'];
    const mockFileData = '1,2023-01-01,40.7128,-74.0060';

    path.join.mockReturnValue(mockTrajectoriesDirPath);
    fs.readdirSync.mockReturnValue(mockFiles);
    fs.statSync.mockReturnValue({ isFile: () => true });
    fs.readFileSync.mockReturnValue(mockFileData);
    taxiIdExists.mockResolvedValue(true);
    pool.query.mockRejectedValue(new Error('DB Error'));

    await expect(loadTrajectoriesData()).rejects.toThrow('DB Error');

    expect(pool.query).toHaveBeenCalledWith('ROLLBACK');
  });
});
