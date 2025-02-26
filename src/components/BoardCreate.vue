<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const boardInput = reactive({
  title: "",
  content: "",
  writer: ""
});

const submitForm = async () => {
  try {
    const response = await axios.post("/api/board/create", boardInput, {
      headers: {
        "Content-Type": "application/json", 
      }
    });
    
    console.log("게시글 생성 성공:", response.data);
    console.log("응답 데이터:", response.data); 
    console.log("response.data.idx:", response.data.idx);

    if (response.data && response.data.idx) {
      router.push("/board/read/" + response.data.idx);
    } else {
      console.error("response.data.idx가 없어요.");
    }
  } catch (error) {
    console.error("게시글 생성 실패:", error);
  }
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="title">제목</label>
      <input v-model="boardInput.title" name="title" type="text" required />
    </div>
    <div>
      <label for="content">내용</label>
      <textarea v-model="boardInput.content" name="content" required></textarea>
    </div>
    <div>
      <label for="writer">작성자</label>
      <input v-model="boardInput.writer" name="writer" type="text" required />
    </div>
    <button type="submit">저장</button>
  </form>
</template>

<style scoped>

div {
  margin-bottom: 15px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
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
