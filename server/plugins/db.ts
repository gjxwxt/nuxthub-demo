import { dbPool } from "../config/database";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSalt, hashWithSalt } from "../utils/crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

export default defineNitroPlugin(async () => {
  try {
    const connection = await dbPool.getConnection();
    console.log("数据库连接成功");

    const schemaPath = path.join(rootDir, "server/database/schema.sql");
    console.log("SQL文件路径:", schemaPath);

    if (!fs.existsSync(schemaPath)) {
      console.error("SQL文件不存在:", schemaPath);
      throw new Error("SQL文件不存在");
    }

    const schema = fs.readFileSync(schemaPath, "utf8");
    const statements = schema
      .split(";")
      .filter((statement) => statement.trim().length > 0);

    for (const statement of statements) {
      await connection.execute(statement);
    }

    console.log("数据库表初始化成功");

    // 检查是否需要创建默认管理员账户
    const [adminUsers] = await connection.execute(
      "SELECT COUNT(*) as count FROM users WHERE username = 'admin'"
    );
    const adminCount = (adminUsers as any[])[0].count;

    if (adminCount === 0) {
      // 使用我们的加密方法创建管理员账户
      const salt = generateSalt();
      const password = "admin"; // 默认密码
      const hashedPassword = hashWithSalt(password, salt);

      await connection.execute(
        "INSERT INTO users (username, email, password, salt, role) VALUES (?, ?, ?, ?, ?)",
        ["admin", "admin@example.com", hashedPassword, salt, "admin"]
      );

      console.log("默认管理员账户创建成功");
    }

    connection.release();
  } catch (error) {
    console.error("数据库初始化失败:", error);
    process.exit(1);
  }
});