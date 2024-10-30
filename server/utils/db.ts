import mysql from "mysql2/promise";
import { readFileSync } from "fs";
import { resolve } from "path";

export const createConnection = async () => {
  const config = useRuntimeConfig();

  return await mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    multipleStatements: true,
  });
};

// 初始化数据库
export const initDatabase = async () => {
  const connection = await createConnection();

  try {
    const schemaPath = resolve("./schema.sql");
    const schema = readFileSync(schemaPath, "utf-8");

    await connection.query(schema);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  } finally {
    await connection.end();
  }
};

// 在需要数据库连接的地方直接使用
export const executeQuery = async <T>(
  sql: string,
  params?: any[]
): Promise<T> => {
  const connection = await createConnection();
  try {
    const [rows] = await connection.query(sql, params);
    return rows as T;
  } finally {
    await connection.end();
  }
};
