import postgres from 'postgres';

const dbConnection = postgres({
  host: 'localhost', 
  port: 5432,        
  username: 'postgres',
  password: 'root',
  database: 'gym',
});

export  { dbConnection }
