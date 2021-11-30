import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'
import { boardService } from './board-service.js'

const KEY = 'boardsDB'

export const groupService = {
   save
}

function save(group) {
   const board = boardService.getCurrBoard()
   if (group.id) {
      const idx = _getGroupIdx(group.id)
      board.groups[idx] = group
      boardService.save(board)
   }
}

function _add(group) {
   return storageService.post(KEY, group)
}

function _update(group) {
   return storageService.put(KEY, group)
}

function _getGroupIdx(groupId) {
   const board = boardService.getCurrBoard()
   const idx = board.groups.findIndex(group => group.id === groupId)
   return idx
}


// function _getCurrGroup() {
//    return boardService.getCurrBoard()
// }