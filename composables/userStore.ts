// 用户信息状态管理
import { defineStore } from "pinia";
export const userStore = defineStore(
  "userStore",
  () => {
    const loged = ref(false);
    const token = ref("");
    const username = ref("");
    const setToken = (_token:string) => {
      token.value = _token;
    };

    const getToken = () => {
      return token.value;
    };

    const clearToken = () => {
      token.value = "";
    };

    const setUserName = (_username:string) => {
      username.value = _username;
    };

    const getUserName = () => {
      return username.value;
    };

    const userLogin = () => {
      loged.value = true;
    };

    const userLogout = () => {
      loged.value = false;
      username.value = ''
    };

    return {
      loged,
      token,
      username,
      getToken,
      setToken,
      setUserName,
      getUserName,
      clearToken,
      userLogin,
      userLogout,
    };
  }
);
