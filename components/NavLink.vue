<template>
    <!-- 顶部连接 -->
  <nav>
    <a href="https://www.sdut.edu.cn/" target="_blank">
      <img src="../assets/imgs/sdut_logo.svg" alt="" />
      SDUT</a
    >
    <a href="https://acm.sdut.edu.cn/" target="_blank">
      <img src="../assets/imgs/sdutacm_logo_colorful-02a05aa9.svg" alt="" />
      SDUT ACM</a
    >
    <a href="https://lgwindow.sdut.edu.cn/" target="_blank">
      <img src="../assets/imgs/xww.png" alt="" />
      SDUT NEWs</a
    >
    <a href="https://lcl.sdutacm.cn/" target="_blank">
      <img src="../assets/imgs/lcl.png" alt="" />
      ACM-LCL</a
    >
  </nav>
</template>
<style scoped lang="less">
nav {
  position: relative;
  display: flex;
  left: 4%;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 100%;
  transition: all 0.5s ease;
  // background-color: red;
  opacity: 0;

  & a {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 20%;
    height: 60%;
    font-size: 0.12rem;
    font-weight: 700;
    // background-color: red;
    border: 0;
    color: #fff;
    border-bottom: 0.01rem solid #fff;
    transition: all 0.5s ease;

    &:hover {
      transform: translateY(-0.03rem);
    }

    & img {
      width: 20%;
    }
  }

  &::before {
    content: "My Group: ";
    position: absolute;
    color: #fff;
    left: -10%;
    font-size: 0.1rem;
  }
}
</style>
