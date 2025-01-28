<template>
  <div class="article">
    <h1>About Me</h1>
    <div class="article_first">
      <div class="focus1" @click="toArticle1">
        <img src="../assets/imgs/focus1.png" alt="" />
        <footer>
          <p class="f_title">数据结构与算法实训 😳</p>
          <p class="f_slogan">为什么我比较看重这次实训? 采用了哪些技术?</p>
          <p class="f_time">2025-1-20</p>
        </footer>
      </div>
      <div class="article_inner">
        <div class="focus2">
          <img src="~/assets/imgs/focus2_1.png" alt="" />
          <footer>
            <p class="f_title">can we exchange emojis? 🥹</p>
            <p class="f_slogan">从哪里来这么多的emoji? 经常复制粘贴不麻烦么?</p>
            <p class="f_time">2025-01-10</p>
          </footer>
        </div>
        <div class="focus2">
          <img src="~/assets/imgs/focus2_2.png" alt="" />
          <footer>
            <p class="f_title">狗头头像的由来</p>
            <p class="f_slogan">为什么这么爱用狗头头像?</p>
            <p class="f_time">2025-01-05</p>
          </footer>
        </div>
      </div>
      <div class="middle">
        <p>平时看点...</p>
        <div class="look">
          <img class="ss" src="~/assets/imgs/bilibili.png" alt="" />
          <img class="ss" src="~/assets/imgs/mihoyo.png" alt="" />
          <img class="ss" src="~/assets/imgs/douyin.png" alt="" />
          <img class="ss" src="~/assets/imgs/github.png" alt="" />
        </div>
      </div>
      <div class="article_bottom">
        <div class="focus3">
          <img src="~/assets/imgs/focus3_1.png" alt="" />
          <footer>
            <p class="f_title">对于前端的一些看法和学习体会</p>
            <p class="f_slogan">为什么这么肯定要走前端?</p>
            <p class="f_time">2024-12-25</p>
          </footer>
        </div>
        <div class="focus3">
          <img src="~/assets/imgs/focus3_2.png" alt="" />
          <footer>
            <p class="f_title">梦开始的地方</p>
            <p class="f_slogan">这就是 SDUT 最好的技术驱动型组织!</p>
            <p class="f_time">2024-12-02</p>
          </footer>
        </div>
        <div class="more">
          <p>Login to see more...</p>
          <button class="btn">Let's Go!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const toArticle1 = ()=> {
  navigateTo('/article1')
}

onMounted(() => {
  const looks: NodeListOf<HTMLElement> = document.querySelectorAll(".ss");
  const articleAnim = new IntersectionObserver(
    (lists) => {
      lists.forEach((list) => {
        if (list.isIntersecting) {
          list.target.classList.remove("articleHide");
        } else {
          list.target.classList.add("articleHide");
        }
      });
    },
    {
      threshold: 0,
    }
  );

  const moreAnim = new IntersectionObserver(
    (lists) => {
      lists.forEach((list) => {
        if (list.isIntersecting) {
          list.target.classList.remove("moreHide");
        } else {
          list.target.classList.add("moreHide");
        }
      });
    },
    {
      threshold: 0.7,
    }
  );

  const lookAnim = new IntersectionObserver((lists) => {
    lists.forEach((list) => {
      if (list.isIntersecting) {
        list.target.classList.remove("moreHide");
        looks.forEach((el) => {
          el.classList.remove("lookHide");
        });
      } else {
        list.target.classList.add("moreHide");
        looks.forEach((el) => {
          el.classList.add("lookHide");
        });
      }
    });
  });

  const articles: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".focus1, .focus2, .focus3"
  );
  articles.forEach((article) => articleAnim.observe(article));

  const more: HTMLElement = document.querySelector(".more") as HTMLElement;
  moreAnim.observe(more);

  const look: HTMLElement = document.querySelector(".look") as HTMLElement;

  lookAnim.observe(look);
});
</script>

<style scoped lang="less">
@import url("../assets/style/aboutme.less");

.articleHide {
  transform: translateX(0) translateY(1rem) !important;
  opacity: 0 !important;
}

.moreHide {
  opacity: 0 !important;
}

.lookHide {
  transform: translateX(-3rem) !important;
  opacity: 0;
}
</style>
