import { dbPool } from "../../config/database";
import { generateSalt, hashWithSalt } from "../../utils/crypto";
import type { RegisterDTO } from "../../types";

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterDTO>(event);

  // 生成盐值
  const salt = generateSalt();
  // 密码加盐加密
  const hashedPassword = hashWithSalt(body.password, salt);

  try {
    const [result] = await dbPool.execute(
      "INSERT INTO users (username, email, password, salt) VALUES (?, ?, ?, ?)",
      [body.username, body.email, hashedPassword, salt]
    );

    const { insertId } = result as any;

    return {
      message: "注册成功",
      user: {
        id: insertId,
        username: body.username,
        email: body.email,
      },
    };
  } catch (error: any) {
    // 处理唯一键冲突
    if (error.code === "ER_DUP_ENTRY") {
      throw createError({
        statusCode: 400,
        message: "用户名或邮箱已存在",
      });
    }
    throw error;
  }
});
