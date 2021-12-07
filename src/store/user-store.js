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
      },
      starredBoards(state) {
         return state.loggedUser.starredBoardsIds
      },
   },
   mutations: {
      setUsers(state, { users }) {
         state.users = users
         state.loggedUser = users[0]
      },
      saveUser(state, { userToSave }) {
         const idx = state.users.findIndex(user => user._id === userToSave._id)
         state.users.splice(idx, 1, userToSave)
         state.loggedUser = userToSave // TEMP - NEEDS TO BE CHANGED
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
      async saveUser({ state, commit }, { user }) {
         try {
            const userToSave = await userService.save(user)
            commit({ type: 'saveUser', userToSave })
         } catch (err) {
            console.log(err)
         }
      }
   }
}
