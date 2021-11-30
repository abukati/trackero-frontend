import { boardService } from '@/services/board-service.js'

export const boardStore = {
   state: {
      boards: [],
      currBoardId: null,
      currBoard: boardService.getCurrBoard(),
   },
   getters: {
      boardsForDisplay(state) {
         return state.boards
      },
      currBoardId(state) {
         return state.currBoardId
      },
      currBoard(state) {
         return state.currBoard
      },
      boardsIds(state) {
         return state.boards.map((board) => board._id)
      },
   },
   mutations: {
      setBoards(state, { boards }) {
         state.boards = boards
      },
      addBoard(state, { board }) {
         state.boards.push(board)
      },
      removeBoard(state, { boardId }) {
         state.boards = state.boards.filter((board) => board._id !== boardId)
      },
      updateBoard(state, { board }) {
         const idx = state.boards.findIndex((currBoard) => currBoard._id === board._id)
         state.boards.splice(idx, 1, board)
      },
   },
   actions: {
      async loadBoards({ state, commit }) {
         try {
            const boards = await boardService.query()
            commit({ type: 'setBoards', boards })
         } catch (err) {
            console.log(err)
         }
      },
      async removeBoard({ commit }, { boardId }) {
         try {
            const removedBoardId = await boardService.remove(boardId)
            if (removedBoardId) commit({ type: 'removeBoard', boardId })
            return removedBoardId
         } catch (err) {
            console.log(err)
         }
      },
      async updateBoard({ commit }, { board }) {
         try {
            await boardService.save(board)
            commit({ type: 'updateBoard', board })
         } catch (err) {
            console.log(err)
         }
      },
      async addBoard({ commit }, { board }) {
         try {
            await boardService.save(board)
            commit({ type: 'addBoard', board })
         } catch (err) {
            console.log(err)
         }
      },
      async getBoardbyId({ commit }, { boardId }) {
         try {
            return await boardService.getById(boardId)
         } catch (err) {
            console.log(err)
         }
      },
      getEmptyBoard({ commit }) {
         try {
            return boardService.getEmptyBoard()
         } catch (err) {
            console.log(err)
         }
      },
   },
}
