import { defineStore } from 'pinia';
import axios from 'axios';

export const useBoardStore = defineStore('board', {
  state: () => ({
    boards: [],
    currentBoard: null,
  }),
  actions: {
    // 게시글 목록 가져오기
    async fetchBoards() {
      const res = await axios.get('/api/board/list');
      this.boards = res.data;
    },
    
    // 게시글 생성하기
    async createBoard(newBoard) {
      await axios.post('/api/board/create', newBoard);
      this.fetchBoards();  // 새로고침 없이 목록 반영
    },
    
    // 게시글 상세 조회하기
    async fetchBoardDetail(boardIdx) {
      const res = await axios.get(`/api/board/read/${boardIdx}`); 
      this.currentBoard = res.data;
    },
  },
});
