export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // 这里应该是真实的登录逻辑
  if (body.username === "admin" && body.password === "password") {
    return {
      token: "mock-token",
      user: {
        id: 1,
        username: body.username,
      },
    };
  }

  throw createError({
    statusCode: 401,
    message: "用户名或密码错误",
  });
});
