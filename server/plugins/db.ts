import { readFileSync } from "fs";
import { resolve } from "path";
import mysql from "mysql2/promise";

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig();

  try {
    const connection = await mysql.createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      multipleStatements: true,
    });

    // 直接从项目根目录读取 schema.sql
    const schemaPath = resolve("./server/database/schema.sql");
    const schema = readFileSync(schemaPath, "utf-8");

    await connection.query(schema);
    await connection.end();

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
});
