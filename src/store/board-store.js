import { boardService } from '@/services/board-service.js'
// import { groupService } from '@/services/group-service.js'

export const boardStore = {
   state: {
      boards: [],
      currBoardId: null,
      currBoard: null,

      groups: [],
      currGroup: null,
   },
   getters: {
      //----------------------------------------------------------- */
      //************************BOARD*****************************
      //----------------------------------------------------------- */
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
      boardGroups(state) {
         return state.currBoard.groups
      },
      //----------------------------------------------------------- */
      //************************MEMBERS*****************************
      //----------------------------------------------------------- */
      boardMembers(state) {
         return state.currBoard.members
      },
   },

   mutations: {
      //----------------------------------------------------------- */
      //**************************BOARD*****************************
      //----------------------------------------------------------- */
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
      setCurrBoard(state, { currBoard }) {
         state.currBoard = currBoard
         state.groups = currBoard.groups
      },
      //----------------------------------------------------------- */
      //********************GROUPS*******************************
      //----------------------------------------------------------- */
      removeGroup(state, { groupId }) {
         const idx = state.groups.findIndex((group) => group.id === groupId)
         state.groups.splice(idx, 1)
      },
      addGroup(state, { group }) {
         state.groups.push(group)
      },
      //----------------------------------------------------------- */
      //***********************TASKS********************************
      //----------------------------------------------------------- */
      updateTaskPositions(state, { tasks, updatedGroup }) {
         const groupIdx = state.groups.findIndex((group) => group.id === updatedGroup.id)
         console.log(state.groups)
         console.log(groupIdx)
      },
      addTask(state, { savedTask, groupId }) {
         console.log('groupId', groupId)
         const idx = state.groups.findIndex((group) => group.id === groupId)
         const group1 = state.groups.find((group) => group.id === groupId)
         console.log(group1)
         // group1.tasks.push(savedTask)
         state.groups.splice(idx, 1, group1)
      },
      //----------------------------------------------------------- */
      //***********************MEMBERS********************************
      //----------------------------------------------------------- */
      addMember(state, { user }) {
         state.currBoard.members.push(user)
      },
      removeMember(state, { user }) {
         const idx = state.currBoard.members.findIndex((member) => member._id === user._id)
         state.currBoard.members.splice(idx, 1)
      },
   },

   actions: {
      //----------------------------------------------------------- */
      //********************BOARD*********************************
      //----------------------------------------------------------- */

      async loadBoards({ state, commit }) {
         try {
            const boards = await boardService.query()
            commit({ type: 'setBoards', boards })
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },
      async removeBoard({ commit }, { boardId }) {
         try {
            const removedBoardId = await boardService.remove(boardId)
            // Might need this after adding httpService
            // if (removedBoardId) commit({ type: 'removeBoard', boardId })
            commit({ type: 'removeBoard', boardId })
            return removedBoardId
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },
      async updateBoard({ commit }, { board }) {
         try {
            await boardService.save(board)
            commit({ type: 'updateBoard', board })
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },
      async addBoard({ commit }, { boardTitle }) {
         try {
            const newBoard = await boardService.getClonedBoard(boardTitle)
            const savedBoard = await boardService.save(newBoard)
            commit({ type: 'addBoard', board: savedBoard })
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },
      async getBoardbyId({ commit }, { boardId }) {
         try {
            const board = await boardService.getById(boardId)
            commit({ type: 'setCurrBoard', currBoard: JSON.parse(JSON.stringify(board)) })
            return board
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },
      async getEmptyBoard() {
         try {
            return boardService.getEmptyBoard()
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },

      //----------------------------------------------------------- */
      //***********************GROUPS********************************
      //----------------------------------------------------------- */

      async updateGroups({ commit }, { groups }) {
         try {
            const board = await boardService.saveGroups(groups)
            commit({ type: 'setCurrBoard', currBoard: board })
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },
      async addGroup({ commit }) {
         try {
            const newGroup = await boardService.getClonedGroup()
            const savedGroup = await boardService.addGroup(newGroup)
            commit({ type: 'addGroup', group: savedGroup })
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },
      async removeGroup({ commit }, { groupId }) {
         try {
            const deletedId = await boardService.removeGroup(groupId)
            console.log('deletedId', deletedId)
            if (deletedId) {
               commit({ type: 'removeGroup', groupId })
               return deletedId
            }
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },

      //----------------------------------------------------------- */
      //***********************TASKS********************************
      //----------------------------------------------------------- */

      async updateTaskPositions({ commit }, { tasks, group }) {
         try {
            commit({ type: 'updateTaskPositions', tasks, updatedGroup: group })
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },
      async addTask({ commit }, { groupId, title }) {
         try {
            console.log('groupId', groupId)
            console.log('title', title)
            const newTask = await boardService.createTask(title)
            console.log('newTask', newTask)
            const savedTask = await boardService.saveTask(newTask, groupId)
            commit({ type: 'addTask', savedTask, groupId })
            return newTask
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },

      //----------------------------------------------------------- */
      //***********************MEMBERS********************************
      //----------------------------------------------------------- */

      async addMember({ commit }, { user }) {
         try {
            await boardService.addMember(user)
            commit({ type: 'addMember', user })
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },
      async removeMember({ commit }, { user }) {
         try {
            await boardService.removeMember(user)
            commit({ type: 'removeMember', user })
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },
   },
}
