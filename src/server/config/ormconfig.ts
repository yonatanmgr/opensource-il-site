import { DataSourceOptions } from 'typeorm';

const connectionOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'src/database/store.db',
  synchronize: true,
  logging: false,
  entities: [
    // Add the paths to your TypeORM entities (models) here
    // For example:
    'src/server/entities/**/*.ts'
  ]
  // migrations: [
  //     // Add the paths to your TypeORM migrations here
  //     // For example:
  //     'src/migrations/**/*.ts',
  // ],
  // subscribers: [
  //     // Add the paths to your TypeORM subscribers here
  //     // For example:
  //     'src/subscribers/**/*.ts',
  // ],
  // cli: {
  //     entitiesDir: 'src/entities',
  //     migrationsDir: 'src/migrations',
  //     subscribersDir: 'src/subscribers',
  // },
};

export default connectionOptions;
