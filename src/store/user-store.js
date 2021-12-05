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
   },
   actions: {
      async loadUsers({ state, commit }) {
         try {
            const users = await userService.query()
            commit({ type: 'setUsers', users })
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },
   },
}
