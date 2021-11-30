import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'
import { boardService } from './board-service.js'
export const groupService = {
   save,
   remove,
}

const KEY = 'boardsDB'
var gGroups

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

function save(group) {
   const savedGroup = group.id ? _update(group) : _add(group)
   return savedGroup
}

// function save(group) {
//    const board = boardService.getCurrBoard()
//    if (group.id) {
//       const idx = _getGroupIdx(group.id)
//       board.groups[idx] = group
//       boardService.save(board)
//    }
// }

// function _getGroupIdx(groupId) {
//    const board = boardService.getCurrBoard()
//    const idx = board.groups.findIndex(group => group.id === groupId)
//    return idx
// }

// function _getCurrGroup() {
//    return boardService.getCurrBoard()
// }
