import 'reflect-metadata'; // This import is required for TypeORM
import connectionOptions from '@/server/config/ormconfig';
import { logger } from '@/server/utils/logger';
import { DataSource, ObjectType, Repository } from 'typeorm';

export async function testHealth() {
  try {
    const appDataSource = await dataSource;
    if (!appDataSource) throw new Error('DB INIT FAILED');
    await appDataSource.query('SELECT 1 + 1');
    return true;
  } catch (err) {
    return false;
  }
}

async function connectToDataSource() {
  const dataSourceConn = new DataSource(connectionOptions);
  try {
    await dataSourceConn.initialize();
    logger.info('Data Source has been initialized!');

    return dataSourceConn;
  } catch (err) {
    logger.error('Error during Data Source initialization', err);
    throw err;
  }
}

export const dataSource = connectToDataSource();

export async function getRepository<T>(Model: ObjectType<T>) {
  const appDataSource = await dataSource;
  const targetRepo = appDataSource.getRepository(Model);
  return targetRepo as Repository<typeof Model>;
}
