import { userService } from '@/services/user-service.js'

export const userStore = {
   state: {
      users: [],
      loggedUser: null
   },
   getters: {
      users(state) {
         return state.users
      },
      currLoggedUser(state) {
         return state.loggedUser
      }
   },
   mutations: {
      setUsers(state, { users }) {
         state.users = users
         state.loggedUser = users[0]
      },
      saveUser(state, { userToSave }) {
         const idx = state.users.findIndex(user => user._id === userToSave._id)
         state.users.splice(idx, 1, userToSave)
      }
   },
   actions: {
      async loadUsers({ state, commit }) {
         try {
            const users = await userService.query()
            commit({ type: 'setUsers', users })
         } catch (err) {
            console.error(err)
         }
      },
      async toggleBoardSub({ state, commit }, { boardId }) {
         try {
            const updatedUser = await userService.updateWatchlist(state.loggedUser, boardId)
            commit({ type: 'updateUserWatchlist', updatedUser })
         } catch (err) {
            console.error(err)
         }
      },
      async saveUser({ state, commit }, { user }) {
         try {
            const userToSave = await userService.save(user)
           commit({ type: 'saveUser', userToSave })
         } catch (err) {
            console.log(err)
         }
      }
   },
}
