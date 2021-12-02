import { boardService } from '@/services/board-service.js'
// import { groupService } from '@/services/group-service.js'

export const boardStore = {
   state: {
      boards: [],
      currBoardId: null,
      currBoard: null,

      groups: [],
      currGroup: null
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
         return state.boards.map(board => board._id)
      },
      boardGroups(state) {
         return state.currBoard.groups
      },
      //----------------------------------------------------------- */
      //************************MEMBERS*****************************
      //----------------------------------------------------------- */
      boardMembers(state) {
         return state.currBoard.members
      }
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
         state.boards = state.boards.filter(board => board._id !== boardId)
      },
      updateBoard(state, { board }) {
         const idx = state.boards.findIndex(currBoard => currBoard._id === board._id)
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
         const idx = state.groups.findIndex(group => group.id === groupId)
         state.groups.splice(idx, 1)
      },
      addGroup(state, { group }) {
         state.groups.push(group)
      },
      updateCurrGroup(state, { group, groupId }) {
         const idx = state.groups.findIndex(group => group.id === groupId)
         state.groups.splice(idx, 1, group)
      },
      //----------------------------------------------------------- */
      //***********************TASKS********************************
      //----------------------------------------------------------- */
      updateTaskPositions(state, { updatedGroup }) {
         const idx = state.groups.findIndex(group => group.id === updatedGroup.id)
         state.currBoard.groups.splice(idx, 1, updatedGroup)
      },
      addTask(state, { savedTask, groupId }) {
         const idx = state.groups.findIndex(group => group.id === groupId)
         const currGroup = state.groups.find(group => group.id === groupId)
         currGroup.tasks.push(savedTask)
         console.log('add task in store')
         state.groups.splice(idx, 1, currGroup)
      },
      //----------------------------------------------------------- */
      //***********************MEMBERS********************************
      //----------------------------------------------------------- */
      addMember(state, { user }) {
         state.currBoard.members.push(user)
      },
      removeMember(state, { user }) {
         const idx = state.currBoard.members.findIndex(member => member._id === user._id)
         state.currBoard.members.splice(idx, 1)
      }
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
            console.log(err)
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
      async addBoard({ commit }, { boardTitle }) {
         try {
            const newBoard = await boardService.getClonedBoard(boardTitle)
            const savedBoard = await boardService.save(newBoard)
            commit({ type: 'addBoard', board: savedBoard })
         } catch (err) {
            console.log(err)
         }
      },
      async getBoardbyId({ commit }, { boardId }) {
         try {
            const board = await boardService.getById(boardId)
            commit({ type: 'setCurrBoard', currBoard: board })
            return board
         } catch (err) {
            console.log(err)
         }
      },
      async getEmptyBoard() {
         try {
            return boardService.getEmptyBoard()
         } catch (err) {
            console.log(err)
         }
      },

      //----------------------------------------------------------- */
      //***********************GROUPS********************************
      //----------------------------------------------------------- */

      async updateGroups({ state, commit }, { groups }) {
         try {
            const board = await boardService.saveGroups(groups, state.currBoard)
            commit({ type: 'setCurrBoard', currBoard: board })
         } catch (err) {
            console.log(err)
         }
      },
      async addGroup({ state, commit }) {
         try {
            const newGroup = await boardService.getClonedGroup()
            await boardService.addGroup(newGroup, state.currBoard)
            commit({ type: 'addGroup', group: newGroup })
         } catch (err) {
            console.log(err)
         }
      },
      async removeGroup({ state, commit }, { groupId }) {
         try {
            const idx = await boardService.removeGroup(groupId, state.currBoard)
            if (idx >= 0) {
               commit({ type: 'removeGroup', groupId })
               return idx
            }
         } catch (err) {
            console.log(err)
         }
      },
      async changeGroupTitle({ state, commit }, { newTitle, groupId }) {
         try {
            console.log(newTitle)
            console.log(groupId)
            const group = await boardService.changeGroupTitle(newTitle, groupId, state.currBoard)
            console.log('group.title', group.title)
            commit({ type: 'updateCurrGroup', group, groupId })
         } catch (err) {
            console.log(err)
         }
      },

      //----------------------------------------------------------- */
      //***********************TASKS********************************
      //----------------------------------------------------------- */

      async updateTaskPositions({ state, commit }, { tasks, group }) {
         try {
            const updatedGroup = await boardService.updateTasks(tasks, group, state.currBoard)
            commit({ type: 'updateTaskPositions', updatedGroup })
         } catch (err) {
            console.log(err)
         }
      },
      async addTask({ state, commit }, { groupId, title }) {
         try {
            const newTask = await boardService.createTask(title)
            const savedTask = await boardService.saveTask(newTask, groupId, state.currBoard)
            if (savedTask) commit({ type: 'addTask', savedTask, groupId })
            return newTask
         } catch (err) {
            console.log(err)
         }
      },

      //----------------------------------------------------------- */
      //***********************MEMBERS********************************
      //----------------------------------------------------------- */

      async addMember({ state, commit }, { user }) {
         try {
            const savedMember = await boardService.addMember(user, state.currBoard)
            if (savedMember) commit({ type: 'addMember', user: savedMember })
         } catch (err) {
            console.log(err)
         }
      },
      async removeMember({ state, commit }, { user }) {
         try {
            await boardService.removeMember(user, state.currBoard)
            commit({ type: 'removeMember', user })
         } catch (err) {
            console.log(err)
         }
      }
   }
}
