<template>
  <div class="login-container">
    <div class="login-card">
      <form @submit.prevent="handleLogin" class="login-form">
        <h2>欢迎登录</h2>
        <p class="subtitle">请输入您的账号和密码</p>

        <div class="form-group">
          <label>用户名</label>
          <div class="input-wrapper">
            <input
              v-model="form.username"
              type="text"
              placeholder="请输入用户名"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label>密码</label>
          <div class="input-wrapper">
            <input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              required
            />
          </div>
        </div>

        <div v-if="error" class="error">
          {{ error }}
        </div>

        <BaseButton
          type="submit"
          variant="primary"
          :disabled="loading"
          class="login-button"
        >
          {{ loading ? "登录中..." : "登录" }}
        </BaseButton>
      </form>
    </div>
    <VersionDisplay />
  </div>
</template>

<script setup lang="ts">
import BaseButton from "~/components/common/BaseButton.vue";
import VersionDisplay from "~/components/common/VersionDisplay.vue";

const router = useRouter();
const message = useMessage();

const form = ref({
  username: "",
  password: "",
});

const loading = ref(false);
const error = ref("");

async function handleLogin() {
  loading.value = true;
  error.value = "";

  try {
    const response = await $fetch<{ token: string }>("/api/auth/login", {
      method: "POST",
      body: form.value,
    });

    if (response.token) {
      try {
        localStorage.setItem("token", response.token);
        message.success("登录成功");
        await navigateTo("/");
      } catch (e) {
        console.error("Storage error:", e);
      }
    } else {
      // message.error("登录失败");
      console.log("登录失败");
    }
  } catch (e: any) {
    if (e.response?.status === 401) {
      message.error(e.response._data.message || "用户名或密码错误");
    } else {
      message.error(e.message || "登录失败");
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.login-form {
  padding: 32px;

  h2 {
    margin: 0 0 8px;
    font-size: 24px;
    font-weight: 600;
    color: #1a1a1a;
    text-align: center;
  }

  .subtitle {
    margin: 0 0 32px;
    font-size: 14px;
    color: #666;
    text-align: center;
  }
}

.form-group {
  margin-bottom: 24px;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
}

.input-wrapper {
  position: relative;

  input {
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    color: #333;
    background: #f5f7fa;
    border: 1px solid transparent;
    border-radius: 8px;
    transition: all 0.3s ease;

    &::placeholder {
      color: #999;
    }

    &:focus {
      outline: none;
      border-color: #4096ff;
      background: white;
      box-shadow: 0 0 0 2px rgba(64, 150, 255, 0.1);
    }
  }
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 8px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.error {
  margin: -12px 0 16px;
  padding: 8px 12px;
  font-size: 13px;
  color: #f56c6c;
  background: #fef0f0;
  border-radius: 4px;
}

@media (max-width: 480px) {
  .login-card {
    max-width: 100%;
  }

  .login-form {
    padding: 24px;
  }
}
</style>
