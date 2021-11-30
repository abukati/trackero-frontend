import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'
import { boardService } from './board-service.js'
export const groupService = {
   save,
   remove,
}

const KEY = 'boardsDB'
var gGroups

function save(group) {
   const savedGroup = group.id ? _update(group) : _add(group)
   return savedGroup
}
function _add(group) {
   return storageService.post(KEY, group)
}
function _update(group) {
   return storageService.put(KEY, group)
}
function _getCurrGroup() {
   gGroups = storageService.query(KEY).map()
}

async function remove(id) {
   gGroups = storageService.query(KEY).groups
   console.log('gGroups', gGroups)
   let filtered = gGroups.map((group) => group.id !== id)
   gGroups = filtered
   return id
}
