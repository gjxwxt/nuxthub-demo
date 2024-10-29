export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  return {
    id,
    name: `用户${id}`,
    createdAt: new Date().toISOString(),
  };
});
