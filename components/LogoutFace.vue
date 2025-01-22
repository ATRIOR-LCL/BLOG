<template>
  <div class="logout-face">
    <p>Hi! {{ userStore().getUserName() }}</p>
    <p>不再看会儿吗 🥺</p>
    <button @click="newLogout">No Logout!</button>
  </div>
</template>
<script setup lang="ts">
// import newLogout from '~/utils/logout';
const newLogout = async () => {
  const { statusCode, message } = await $fetch("/api/logout", {
    method: "GET",
  });
  // console.log(data.value);
  if (statusCode == 200) {
    const logout: HTMLElement = document.querySelector(
      ".logout-face"
    ) as HTMLElement;
    logout.classList.remove("loginActive");
    userStore().userLogout();
    // navigateTo('/')
  } else {
    alert(message);
  }

  // const rep = await $fetch("http://localhost:1234/logout", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     username: userStore().getUserName(),
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }) as {code:number};
  // console.log(rep);
  // if (rep.code == 200) {
  //   const logout:HTMLElement = document.querySelector('.logout-face') as HTMLElement
  //   logout.classList.remove('loginActive')
  //   localStorage.removeItem("token");
  //   userStore().userLogout()
  //   userStore().clearToken()
  //   navigateTo("/");
  // }else{
  //   alert('error')
  // }
  // return rep;
};
</script>
<style scoped lang="less">
.logout-face {
  position: fixed;
  right: 2%;
  top: 10%;
  width: 10%;
  aspect-ratio: 2/1;
  background-color: #fff;
  border-radius: 0.03rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 13;
  transition: all 0.5s ease;
  transform: translateX(0) translateY(-1rem);
  opacity: 0;
  & button {
    width: 45%;
    aspect-ratio: 2/1;
    border: none;
    color: #fff;
    font-size: 0.06em;
    background: #000;
    border-radius: 0.03rem;
    white-space: nowrap;
    transition: all 0.5s ease;
    &:active {
      transform: scale(0.9);
    }
    &:hover {
      cursor: pointer;
    }
  }
  & p {
    font-size: 0.06em;
  }
}
</style>
