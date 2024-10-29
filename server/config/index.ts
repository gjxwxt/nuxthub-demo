export const config = {
  // 数据库配置
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "nuxt_app",

  // JWT配置
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  // API配置
  API_PREFIX: "/api",

  // 其他配置
  NODE_ENV: process.env.NODE_ENV || "development",
};
