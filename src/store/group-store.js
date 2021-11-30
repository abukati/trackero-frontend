import { groupService } from '@/services/group-service.js'
export const groupStore = {
   state: {
      groups: [],
      currGroup: null,
   },
   getters: {},
   mutations: {
      removeGroup(state, { groupId }) {
         const idx = state.groups.findIndex((group) => group._id === groupId)
         state.groups.splice(idx, 1)
      },
   },
   actions: {
      updateGroup({ commit }, { value }) {
         try {
            // await groupService.save(value)
         } catch (err) {
            window.open(`https://stackoverflow.com/search?q=${err.message}`, '_blank')
         }
      },
      async removeGroup({ commit }, { groupId }) {
         console.log('groupId', groupId)
         try {
            const deletedId = await groupService.remove(groupId)
            console.log('deletedId', deletedId)
            if (deletedId) {
               commit({ type: 'removeGroup', groupId })
               return deletedId
            }
         } catch (err) {
            console.log(err)
         }
      },
   },
}
