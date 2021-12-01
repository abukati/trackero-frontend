import { userService } from '@/services/user-service.js'

export const userStore = {
   state: {
      users: [],
   },
   getters: {
      users(state) {
         return state.users
      },
   },
   mutations: {
      setUsers(state, { users }) {
         state.users = users
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
