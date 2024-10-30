import { createPool } from "mysql2/promise";
const config = useRuntimeConfig();

console.log(config);

export const dbPool = createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
