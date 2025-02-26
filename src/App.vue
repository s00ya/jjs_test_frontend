<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <h1>게시판</h1>
    <router-view />  <!-- ✅ 여기에서 라우터에 따라 페이지가 바뀜 -->
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
