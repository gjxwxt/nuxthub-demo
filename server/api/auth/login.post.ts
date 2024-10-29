import { dbPool } from "../../config/database";
import { generateToken } from "../../utils/jwt";
import { verifyPassword } from "../../utils/crypto";
import type { LoginDTO } from "../../types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<LoginDTO>(event);

    // 参数验证
    if (!body || !body.username || !body.password) {
      throw createError({
        statusCode: 400,
        message: "用户名和密码不能为空",
      });
    }

    // 先获取用户信息（包括密码和盐值）
    const [users] = await dbPool.execute(
      "SELECT * FROM users WHERE username = ? LIMIT 1",
      [body.username]
    );

    const user = (users as any[])[0];

    if (!user || !verifyPassword(body.password, user.password, user.salt)) {
      throw createError({
        statusCode: 401,
        message: "用户名或密码错误",
      });
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  } catch (error: any) {
    // 统一错误处理
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "服务器内部错误",
    });
  }
});
