import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'
import { boardService } from './board-service.js'

export const groupService = {
   remove,
   saveGroups,
}

const KEY = 'boardsDB'
var gGroups

async function remove(id) {
   gGroups = storageService.query(KEY).groups
   console.log('gGroups', gGroups)
   let filtered = gGroups.map((group) => group.id !== id)
   gGroups = filtered
   return id
}

async function saveGroups(groups) {
   const board = await boardService.getCurrBoard()
   board.groups = JSON.parse(JSON.stringify(groups))
   return board
}