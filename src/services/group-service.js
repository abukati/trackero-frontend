// import { storageService } from './async-storage-service.js'
// import { utilService } from './util-service.js'
// import { boardService } from './board-service.js'
// export const groupService = {
//    remove,
//    saveSortedGroups,
// }

// const KEY = 'boardsDB'
// var gGroups

// async function remove(id) {
//    gGroups = storageService.query(KEY).groups
//    console.log('gGroups', gGroups)
//    let filtered = gGroups.map((group) => group.id !== id)
//    gGroups = filtered
//    return id
// }

// async function saveSortedGroups(groups) {
//    const board = await boardService.getCurrBoard()
//    board.groups = groups
//    return board
// }

// function removeGroup(groupId) {
//     console.log('groupId')
//     console.log(gBoards)
//     let currBoard = getCurrBoard()
//     console.log('currBoard', currBoard)
//     const idx = currBoard.groups.findIndex((group) => group.id === groupId)
//     currBoard.groups.splice(idx, 1)
//     save(currBoard)
//     return currBoard
//  }
