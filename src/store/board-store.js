import { boardService } from '@/services/board-service.js'
// import { groupService } from '@/services/group-service.js'
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'

export const boardStore = {
   state: {
      boards: [],

      currBoardId: null,
      currBoard: null,
      groups: [],
      currGroup: null,

      checked: true
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
         let ids = []
         state.boards.map(board => {
            ids.push(board._id)
         })
         return ids
      },
      allBoards(state) {
         let all = []
         state.boards.filter(board => {
            all.push(board)
         })
         return all
      },
      boardGroups(state) {
         return state.currBoard.groups
      },
      getBoardBgc(state) {
         return state.currBoard.style.bgColor
      },
      labels(state) {
         return state.currBoard.labels
      },
      allBoardTasks(state) {
         const tasks = []
         state.currBoard.groups.forEach(group => {
            group.tasks.forEach(task => {
               tasks.push(task)
            })
         })
         return tasks
      },

      //----------------------------------------------------------- */
      //************************MEMBERS*****************************
      //----------------------------------------------------------- */
      boardMembers(state) {
         return state.currBoard.members
      },
      checked(state) {
         return state.checked
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
      setBoardBgc(state, { bgc }) {
         state.currBoard.style.bgColor = bgc
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
         state.groups.splice(idx, 1, currGroup)
      },
      updateTask(state, { updatedTask, groupId }) {
         const idx = state.groups.findIndex(group => group.id === groupId)
         const currGroup = state.groups.find(group => group.id === groupId)
         const taskIdx = currGroup.tasks.findIndex(currTask => currTask.id === updatedTask.id)
         state.currBoard.groups[idx].tasks.splice(taskIdx, 1, updatedTask)
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
      },
      toggleCheckbox(state, { checked }) {
         state.checked = !state.checked
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
            const resMsg = await boardService.remove(boardId)
            if (resMsg === 'Deleted successfully') commit({ type: 'removeBoard', boardId })
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
            const savedBoard = await boardService.save(board)
            commit({ type: 'addBoard', board: savedBoard })
            return savedBoard
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
      async changeBoardBgc({ state, commit }, { bgc }) {
         try {
            await boardService.changeBoardBgc(bgc, state.currBoard)
            commit({ type: 'setBoardBgc', bgc })
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
      async addGroup({ state, commit }, { title }) {
         try {
            const newGroup = await boardService.getEmptyGroup(title)
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
      async updateGroup({ state, commit }, { group }) {
         try {
            const updatedGroup = await boardService.updateGroupTitle(group, state.currBoard)
            commit({ type: 'updateCurrGroup', group, groupId: updatedGroup.id })
         } catch (err) {
            console.log(err)
         }
      },
      async getGroupIdByTaskId({ state, commit }, { taskId }) {
         try {
            var groupId = null
            state.currBoard.groups.forEach(group => {
               group.tasks.find(task => {
                  if (task.id === taskId) {
                     console.log('groupId', group.id)
                     groupId = group.id
                  }
               })
            })
            return groupId
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
      async updateTask({ state, commit }, { groupId, task }) {
         try {
            const updatedTask = await boardService.updateSingleTask(task, state.currBoard, groupId)
            if (updatedTask) commit({ type: 'updateTask', updatedTask, groupId })
         } catch (err) {
            console.log(err)
         }
      },
      async getEmptyTodo({ state, commit }) {
         try {
            return boardService.getEmptyTodo()
         } catch (err) {
            console.log(err)
         }
      },
      async getEmptyComment({ state, commit }) {
         try {
            return boardService.getEmptyComment()
         } catch (err) {
            console.log(err)
         }
      },
      async getEmptyChecklist({ state, commit }) {
         try {
            return boardService.getEmptyChecklist()
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