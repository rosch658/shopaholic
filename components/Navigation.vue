<template>
  <header class="ui-container">
    <NuxtLink to="/" class="title">SHOPAHOLIC</NuxtLink>
    <SearchBar class="nav-search" v-if="route.path === '/search'" />
    <div class="nav-section">
      <button class="ui-button link" @click="handleEssay" v-if="loginToken">
        Essay
      </button>
      <div class="login-section">
        <p
          class="ui-button"
          :disabled="!isReady"
          @click="() => login()"
          v-if="!loginCookie"
        >
          Log In
        </p>
        <p class="ui-button" @click="signout" v-else>Log out</p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";

const route = useRoute();
const loginCookie = useCookie("login-token");
const { loginToken, setLoginToken } = useLogin();

const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
  setLoginToken(response.access_token);
  loginCookie.value = response.access_token;
  console.log("Access Token: ", response.access_token);
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log("Error: ", errorResponse);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  // other options
});

function signout() {
  setLoginToken("");
  loginCookie.value = "";
}

// Essay
const { handleEssay } = useEssay();
</script>

<style scoped>
.ui-container {
  width: 100%;
  height: 9rem;
  background-color: #f2e0b5;
  padding: 1.2rem 2rem;
  box-shadow: 0 4px 6px -1px rgb(255, 171, 133 / 0.1);
  border-bottom-width: 0.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 50;
}

.title {
  text-decoration: none;
  color: #897340;
  font-size: 3rem;
  font-weight: 600;
}

.nav-search {
  width: 50%;
  height: 5rem;
}

.nav-section {
  display: flex;
  gap: 2rem;
  font-size: 2rem;
}

.login-section {
  display: flex;
}

.nav-section .link {
  border: 0.1rem solid #897340;
}

.ui-button {
  font-size: 2rem;
  background-color: #f2e0b5;
  border: 0.1rem solid #f2e0b5;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  color: #897340;
  padding: 1.6rem 3.2rem;
  transition: all 0.3s;
  cursor: pointer;
}

.ui-button:hover,
.ui-button:active {
  background-color: #897340;
  color: #fff;
}
</style>
