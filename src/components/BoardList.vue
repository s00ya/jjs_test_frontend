<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const boards = ref([]);
const router = useRouter(); 

// 게시글 목록 불러오기
const fetchBoards = async () => {
  try {
    const response = await axios.get("/api/board/list");
    boards.value = response.data;
  } catch (error) {
    console.error("게시글 목록 조회 실패:", error);
  }
};


onMounted(() => {
  fetchBoards();
});

// 게시글 작성 페이지 이동
const goToCreate = () => {
  router.push("/board/create"); 
};
</script>

<template>
  <div>
    <h3>게시글 목록</h3>
    <ul>
      <li v-for="board in boards" :key="board.idx">
        <router-link :to="'/board/read/' + board.idx">{{ board.title }}</router-link>
      </li>
    </ul>

 
    <button @click="goToCreate">게시글 작성</button>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
