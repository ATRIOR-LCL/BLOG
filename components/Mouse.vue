<template>
  <div class="contan">
    <div class="mouse">
      <div class="mouse1"></div>
    </div>
    <div class="arrow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="#FFFFFF"
        class="arrow_line"
      >
        <path
          d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="less">
.contan {
  display: flex;
  position: fixed;
  width: 1rem;
  aspect-ratio: 1/1;
  justify-content: center;
  align-items: center;
  z-index: 111;
  right: 0;
}

.mouse {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: flex-start;
  width: 0.2rem;
  height: 0.3rem;
  border-radius: 2rem;
  border: @BlackFont 0.02rem solid;
  z-index: 111;
  transform: scale(0.5);
}

.mouse1 {
  position: absolute;
  top: 5px;
  width: 0.02rem;
  height: 0.1rem;
  background-color: @BlackFont;
  border-radius: 1rem;
  z-index: 111;
}

.arrow {
  display: flex;
  position: absolute;
  width: 0.1rem;
  height: 0.2rem;
  justify-content: center;
  animation: 1.6s arrow-move infinite ease;
  z-index: 100;
}

@keyframes arrow-move {
  0% {
    top: 60%;
    opacity: 1;
  }
  100% {
    top: 70%;
    opacity: 0;
  }
}
</style>
<script setup></script>
