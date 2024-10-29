import { dbPool } from "../../config/database";

export default defineEventHandler(async (event) => {
  const [users] = await dbPool.execute(
    "SELECT id, username, email, created_at FROM users"
  );

  return { users };
});
