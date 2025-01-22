<template>
  <article>
    <img class="bg-1" src="~/assets/imgs/xd.jpg" alt="" />
    <div class="mask"></div>
    <!-- <div class="mask-login"></div> -->
    <header>
      <img class="avatar" src="~/assets/imgs/touxiang.jpg" alt="" />
      <NavLink />
      <HeadLogin />
    </header>
    <main>
      <LogoutFace />
      <LoginFace />
      <div class="title">
        <img src="/imgs/code.png" alt="" class="code" />
        <h1 class="s_title">atrior's Blog...</h1>
      </div>
      <h2 class="slogan">
        判断生活是否值得经历，本身就是在回答哲学的基本问题。
      </h2>
    </main>
    <footer>
      <FirstFooter />
    </footer>
    <Mouse v-if="showMouse" />
  </article>
  <AboutMe />
</template>

<script setup lang="ts">
const showMouse = ref<boolean>(false)
const useRem = () => {
  let w = document.documentElement.clientWidth;
  let size = w / 10 + "px";
  document.documentElement.style.fontSize = size;
};

useHead({
  title: "atrior的博客",
  meta: [
    {
      name: "description",
      content: "atrior的博客",
    },
  ],
  titleTemplate: "%s 首页",
});
onMounted(() => {
  useRem();
  window.addEventListener("resize", useRem);

  document.addEventListener("click", clickOutSide);

  const reveal = () => {
    const header = document.querySelector("header");
    let scrollY = window.scrollY;
    if (scrollY > 0) {
      if (header) {
        header.classList.add("active");
      }
    } else {
      if (header) {
        header.classList.remove("active");
      }
    }

    if(scrollY> 900){
      showMouse.value=true
    }else{
      showMouse.value = false
    }
  };
  window.addEventListener("scroll", reveal);

  const codeAnim = new IntersectionObserver((lists) => {
    lists.forEach((list) => {
      if (list.isIntersecting) {
        console.log("yes");
        list.target.classList.add("codeActive");
      } else {
        list.target.classList.remove("codeActive");
      }
    });
  },{
    threshold: .5
  });

  const code: HTMLElement = document.querySelector(".code") as HTMLElement;
  codeAnim.observe(code);
  const slogan: HTMLElement = document.querySelector(".slogan") as HTMLElement;
  const titleAnim = new IntersectionObserver((lists) => {
    lists.forEach((list) => {
      if (list.isIntersecting) {
        slogan.classList.add("navSctive");
        list.target.classList.add("titleActive");
      } else {
        list.target.classList.remove("titleActive");
        slogan.classList.remove("navSctive");
      }
    });
  },{
    threshold: .5
  });
  const title: HTMLElement = document.querySelector(".s_title") as HTMLElement;

  titleAnim.observe(title);
});
const clickOutSide = (event: MouseEvent): void => {
  let logout: HTMLElement = document.querySelector(
    ".logout-face"
  ) as HTMLElement;
  if (!logout.contains(event.target as Node)) {
    logout.classList.remove("loginActive");
  }
};
onBeforeUnmount(() => {
  document.removeEventListener("click", clickOutSide);
});
</script>

<style scoped lang="less">
@import url("../assets/style/index.less");

.navSctive {
  opacity: 1;
  filter: blur(0);
}

.headActive {
  background-color: rgba(0, 0, 0, 0.5);
}

.loginActive {
  opacity: 1 !important;
  transform: translateX(0) translateY(0) !important;
}

.codeActive {
  transform: translateX(-230%) !important;
}

.titleActive {
  transform: translateX(15%) !important;
  opacity: 1 !important;
  filter: blur(0) !important;
}
</style>
