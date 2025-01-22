<template>
  <div class="login-face">
    <div class="ll">
      <div class="hd">
        <p>{{ title }}</p>
        <p class="errinfo">
          {{ errtext }}
        </p>
        <p class="close" @click="shutdownLogin">x</p>
      </div>
      <div class="mm">
        <div class="email">
          <p>📧 Email or Username</p>
          <input
            type="text"
            placeholder="通往魔法世界的必经之路* ^_^ *"
            v-model="userlogin.email"
          />
        </div>
        <div class="email">
          <p>🔑 Password</p>
          <input
            type="text"
            placeholder="无比珍贵的东西~ >_< ~"
            v-model="userlogin.password"
          />
        </div>
      </div>
      <div class="foot">
        <div class="remember" v-show="isLogin">
          <p>Remember Me</p>
          <input type="checkbox" v-model="userlogin.saveToken" />
        </div>
        <button @click="newLogin">{{ btText }}</button>
        <div class="register" v-show="isLogin">
          <p>without an account?</p>
          <button @click="toRegister">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import preventScroll from '~/utils/preventScroll'
const title = ref<string>("Login 😊");
const isLogin = ref<boolean>(true);
const btText = ref<string>("Login");

const errtext = ref<string>("");

function toRegister() {
  title.value = "Register 🫣";
  isLogin.value = false;
  btText.value = "Register";
}

function toLogin() {
  title.value = "Login 😊";
  isLogin.value = true;
  btText.value = "Login";
}

function showError() {
  const err: HTMLElement = document.querySelector(".errinfo") as HTMLElement;
  if (err) {
    err.style.opacity = "1";
    setTimeout(() => {
      err.style.opacity = "0";
    }, 2000);
  }
}

interface UserLogin {
  email: string;
  password: string;
  saveToken: boolean;
}

const userlogin = ref<UserLogin>({
  email: "",
  password: "",
  saveToken: false,
});

const shutdownLogin = () => {
  window.removeEventListener("wheel", preventScroll);
  let login: HTMLElement = document.querySelector(".login-face") as HTMLElement;
  login.classList.remove("loginActive");
  let maskLogin: HTMLElement = document.querySelector(
    ".mask-login"
  ) as HTMLElement;
  if (maskLogin) {
    maskLogin.style.backgroundColor = "rgba(0, 0, 0, 0)";
  }
};

const newLogin = async () => {
  if (isLogin.value) {
    try {
      const { statusCode, message } = await $fetch("/api/login", {
        method: "POST",
        body: {
          username: userlogin.value.email,
          password: userlogin.value.password,
          remember: userlogin.value.saveToken,
        },
      });
      if (statusCode == 200) {
        userStore().userLogin();
        userStore().setUserName(userlogin.value.email);
        shutdownLogin();
        // navigateTo('/')
      } else {
        errtext.value = "账号或密码错误";
        showError();
      }
    } catch (e) {
      throw new Error(e + "");
    }
    // const rep = (await $fetch("http://127.0.0.1:1234/login", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: userlogin.value.email,
    //     password: userlogin.value.password,
    //     saveToken: userlogin.value.saveToken,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })) as { code: number; message: { token: string } };
    // console.log(rep);
    // if (rep.code == 200) {
    //   shutdownLogin();
    //   localStorage.setItem("token", rep.message.token);
    //   userStore().userLogin();
    //   console.log("has loged");
    //   userStore().setUserName(userlogin.value.email);
    //   // console.log(rep.message.token)
    //   userStore().setToken(rep.message.token || "");
    //   console.log("client:" + userStore().getToken());
    // } else {
    //   errtext.value = '账号或密码错误'
    //   showError()
    // }
    // return rep;
  } else {
    try {
      const { statusCode, message } =await $fetch("/api/register", {
        method: "POST",
        body: {
          username: userlogin.value.email,
          password: userlogin.value.password,
        },
      });
      if (statusCode == 200) {
        errtext.value = "OK !";
        showError();
        setTimeout(() => {
          toLogin();
        }, 1000);
      } else {
        errtext.value = "用户名重复!";
        showError();
      }
    } catch (e) {
      throw new Error(e + "");
    }
    // const rep = (await $fetch("http://127.0.0.1:1234/register", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: userlogin.value.email,
    //     password: userlogin.value.password,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })) as { code: number; data: { message: string } };
    // if (rep.code == 200) {
    //   errtext.value = "OK !";
    //   showError();
    //   setTimeout(() => {
    //     toLogin();
    //   }, 2000);
    // } else {
    //   errtext.value = "用户名重复!";
    //   showError();
    // }
  }
};
</script>
<style scoped lang="less">
.errinfo {
  position: absolute;
  // background-color: red;
  width: 22%;
  height: 0.5rem;
  right: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.3em;
  opacity: 0;
  transition: all 0.5s ease;
}

.login-face {
  position: fixed;
  width: 30%;
  aspect-ratio: 1/0.8;
  background-color: @BlackBack;
  z-index: 20;
  display: flex;
  border-radius: 0.03rem;
  transition: all 0.5s ease;
  transform: translateX(2rem) translateY(-1rem);
  opacity: 0;
  z-index: 11;
  & .ll {
    width: 100% !important;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .hd {
      width: 100% !important;
      height: 20% !important;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.3em;
      font-weight: 700;
      padding-left: 0.1rem;
      color: #fff;
      border-bottom: 0.01rem solid #eee;

      & .close {
        width: 1em;
        height: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.6em;
        margin-right: 0.2rem;
        border: 0.01rem solid #fff;
        transition: all 0.5s ease;

        &:hover {
          border: 0.01rem solid gray;
          color: gray;
        }
      }
    }

    & .mm {
      width: 100%;
      height: 60%;

      & .email {
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        // background-color: green;
        padding-left: 0.1rem;

        & p {
          color: #fff;
          font-size: 0.15em;
          margin-bottom: 0.02rem;
        }

        & input {
          width: 80%;
          height: 30%;
          border: none;
          border-radius: 0.03rem;
          padding-left: 0.1rem;

          &:focus {
            outline: none;
          }
        }
      }
    }

    & .foot {
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 0.01rem solid #eee;
      position: relative;
      & .remember {
        position: absolute;
        left: 0;
        width: 30%;
        height: 30%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        & p {
          font-size: 0.1em;
          color: #fff;
        }
        & input {
          border: none;
        }
      }

      & .register {
        width: 50%;
        height: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: end;
        position: absolute;
        padding-right: 0.1rem;
        right: 0;
        font-size: 0.08em;
        & p {
          color: #fff;
        }
        & button {
          color: rgb(103, 212, 255);
          text-decoration: underline;
        }
      }
      & button {
        width: 20%;
        height: 50%;
        border-radius: 0.05rem;
        border: none;
        font-weight: 700;
        cursor: pointer;
        // outline: none;
        z-index: 5;
        transition: transform 0.5s linear;

        &:active {
          transform: scale(0.9);
        }
      }
    }
  }
}
</style>
