<template>
  <div id="main" class="containerMainPage">
    <div class="containerText">
      <h3 class="firstText main_h_1">Мой блог</h3>
      <article class="textAround1">Мой блог</article>
      <!-- Добавим временный текст для проверки скролла -->
      <div style="height: 2000px;">
        <p>it is a long established fact that a reader will be distracted by the readable content of a page when looking at its </p>
      </div>
    </div>
  </div>
</template>


<script setup>

</script>

<style lang="scss" scoped>
html,
body,
#main {
  height: 100%;
  margin: 0;
}

#main {
  background: url("../../assets/scale.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
