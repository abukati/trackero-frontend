import { groupService } from '@/services/group-service.js'

export const groupStore = {
   state: {
      groups: [],
      currGroup: null,
   },
   getters: {

   },
   mutations: {

   },
   actions: {
      async updateGroup({ commit }, { groups }) {
         try {
            await groupService.save(groups)
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      }
   }
}