export default defineEventHandler((event) => {
  return {
    message: "Hello from Nuxt API",
    time: new Date().toISOString(),
  };
});
