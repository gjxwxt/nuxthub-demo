import crypto from "crypto";

/**
 * 密码加密
 * @param password 原始密码
 * @returns 加密后的密码
 */
export const hash = (password: string): string => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

/**
 * 生成随机盐值
 * @param length 盐值长度
 * @returns 随机盐值
 */
export const generateSalt = (length: number = 16): string => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

/**
 * 密码加盐加密
 * @param password 原始密码
 * @param salt 盐值
 * @returns 加密后的密码
 */
export const hashWithSalt = (password: string, salt: string): string => {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
};

/**
 * 验证密码
 * @param password 原始密码
 * @param hash 加密后的密码
 * @param salt 盐值（如果使用了加盐）
 * @returns 是否匹配
 */
export const verifyPassword = (
  password: string,
  hash: string,
  salt?: string
): boolean => {
  if (salt) {
    return hashWithSalt(password, salt) === hash;
  }
  return crypto.createHash("sha256").update(password).digest("hex") === hash;
};
