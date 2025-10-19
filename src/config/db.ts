import postgres from 'postgres';

const dbConnection = postgres({
  host: '192.168.1.53',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'gym',
});

export { dbConnection }
