export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    "auth",
    (to) => {
      // 确保在客户端环境下执行
      if (import.meta.client) {
        // 需要认证的页面路径
        const authRequired = ["/", "/users", "/profile"];

        // 如果访问的是需要认证的页面
        if (authRequired.includes(to.path)) {
          try {
            const token = localStorage.getItem("token");
            // 如果没有token，重定向到登录页
            if (!token) {
              return navigateTo("/login");
            }
          } catch (e) {
            console.error("Auth check error:", e);
            return navigateTo("/login");
          }
        }
      }
    },
    { global: true }
  );
});
