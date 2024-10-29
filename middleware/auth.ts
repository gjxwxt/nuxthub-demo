export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const token = localStorage.getItem("token");

    // 如果没有token且不是登录页面，重定向到登录页
    if (!token && to.path !== "/login") {
      return navigateTo("/login");
    }

    // 如果有token且是登录页面，重定向到首页
    if (token && to.path === "/login") {
      return navigateTo("/");
    }
  }
});
