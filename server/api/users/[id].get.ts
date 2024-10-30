import { executeQuery } from "~/server/utils/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const user = await executeQuery("SELECT * FROM users WHERE id = ?", [id]);
    return user;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Database error",
    });
  }
});
