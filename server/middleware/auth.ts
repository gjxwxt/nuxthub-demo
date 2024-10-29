import { verifyToken } from "../utils/jwt";

export default defineEventHandler(async (event) => {
  // 白名单路径，不需要验证token
  const whitelist = [
    "/api/auth/login",
    "/api/auth/register",
    "/", // 首页
    "/login", // 登录页
    "/register", // 注册页
  ];

  // 如果是白名单中的路径，直接放行
  if (whitelist.includes(event.path)) return;

  // 如果不是 API 请求，放行（让页面路由自己处理认证）
  if (!event.path.startsWith("/api")) return;

  const token = getHeader(event, "authorization")?.replace("Bearer ", "");

  if (!token) {
    throw createError({
      statusCode: 401,
      message: "未授权访问",
    });
  }

  try {
    const payload = verifyToken(token);
    // 将用户信息添加到上下文中
    event.context.user = payload;
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "无效的token",
    });
  }
});
