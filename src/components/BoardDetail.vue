<template>
    <div v-if="board">
      <h1>{{ board.title }}</h1>
      <p>{{ board.content }}</p>
      <p>작성자: {{ board.writer }}</p>
  
      <h3>댓글</h3>
      <ul>
        <li v-for="comment in board.commentList" :key="comment.idx">
          {{ comment.writer }}: {{ comment.content }}
        </li>
      </ul>
  
      <h3>댓글 작성</h3>
      <input v-model="commentWriter" placeholder="작성자 이름 입력" />
      <input v-model="newComment" placeholder="댓글 입력" />
      <button @click="addComment">작성</button>
      <button @click="$router.push('/')">목록으로</button>
    </div>
  
    <!-- 로딩 화면 -->
    <div v-else>
      <p>로딩 중...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const board = ref(null);
  const newComment = ref("");
  const commentWriter = ref(""); 
  

  onMounted(async () => {
    try {
      const res = await axios.get(`/api/board/read/${route.params.id}`);
      board.value = res.data;
    } catch (error) {
      console.error("게시글 정보 로딩 실패:", error);
    }
  });
  
  const addComment = async () => {
    if (!newComment.value.trim() || !commentWriter.value.trim()) return;
  
    try {
      await axios.post("/api/comment/create", {
        content: newComment.value,
        writer: commentWriter.value, 
        boardIdx: board.value.idx,
      });
  
      newComment.value = "";
      commentWriter.value = ""; 
  
      // 댓글 추가 후 새롭게 게시글 정보 가져오기
      const res = await axios.get(`/api/board/read/${route.params.id}`);
      board.value = res.data;
    } catch (error) {
      console.error("댓글 추가 실패:", error);
    }
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 5px 0;
  }
  
  input {
    width: 200px;
    padding: 5px;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 5px 10px;
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
  