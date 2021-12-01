import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'
const KEY = 'boardsDB'
// const BASE_URL = process.env.NODE_ENV !== 'development' ? '/api/board/' : '//localhost:3000/api/board/'
// const axios = require('axios')

export const boardService = {
   query,
   getById,
   remove,
   save,
   getEmptyBoard,
   getCurrBoard,
   createBoard,
   removeGroup,
}

var gBoards = _createBoards()
let currBoard = null

function query() {
   return storageService.query(KEY)
}

function getCurrBoard() {
   console.log('currBoard', currBoard)
   return currBoard
}

async function getById(boardId) {
   try {
      currBoard = await storageService.get(KEY, boardId)
      console.log('currBoard', currBoard)
      return currBoard
   } catch (err) {
      console.log(err)
   }
}

function remove(boardId) {
   return storageService.remove(KEY, boardId)
}

function removeGroup(groupId) {
   console.log('groupId')
   console.log(gBoards)
   let currBoard = getCurrBoard()
   console.log('currBoard', currBoard)
   const idx = currBoard.groups.findIndex((group) => group.id === groupId)
   currBoard.groups.splice(idx, 1)
   save(currBoard)
}

function save(board) {
   console.log('save', board)
   const savedBoard = board._id ? _update(board) : _add(board)
   return savedBoard
}

function _add(board) {
   return storageService.post(KEY, board)
}

function _update(board) {
   return storageService.put(KEY, board)
}

function getEmptyBoard() {
   const board = createBoard('Create Board', { _id: 'u100', username: 'guest', fullname: 'guest', imgUrl: '' })
   return board
}

function _createBoards() {
   var boards = JSON.parse(localStorage.getItem(KEY))
   if (!boards || !boards.length) {
      boards = [createBoard('Software development'), createBoard('Project management'), createBoard('Business board')]
      localStorage.setItem(KEY, JSON.stringify(boards))
   }
   return boards
}

function createBoard(
   title,
   user = {
      _id: 'u101',
      username: 'BaselB',
      fullname: 'Basel Boulos',
      imgUrl: '',
   }
) {
   return {
      _id: utilService.makeId(),
      title,
      createdAt: Date.now(),
      createdBy: {
         _id: user._id,
         username: user.username,
         fullname: user.fullname,
         imgUrl: user.imgUrl,
      },
      style: {
         bgColor: '#29cce5',
         bgImg: '',
      },
      labels: [
         {
            id: 'l101',
            title: 'Done',
            color: 'green',
         },
         {
            id: 'l102',
            title: '',
            color: 'yellow',
         },
         {
            id: 'l103',
            title: 'Flexible',
            color: 'orange',
         },
         {
            id: 'l104',
            title: 'Important',
            color: 'red',
         },
         {
            id: 'l105',
            title: '',
            color: 'purple',
         },
         {
            id: 'l106',
            title: 'Optional',
            color: 'blue',
         },
      ],
      members: [
         {
            _id: 'u101',
            username: 'BaselB',
            fullname: 'Basel Boulos',
            imgUrl: '',
         },
         {
            _id: 'u102',
            username: 'ArtiomB',
            fullname: 'Artiom Bukati',
            imgUrl: '',
         },
         {
            _id: 'u103',
            username: 'NoaN',
            fullname: 'Noa Nissim',
            imgUrl: '',
         },
      ],
      groups: [
         {
            id: 'g101',
            title: 'Develop trackero',
            tasks: [
               {
                  id: 't101',
                  title: 'Project trackero task',
                  style: {
                     bgColor: '#ffffff',
                  },
                  members: [
                     {
                        _id: 'u103',
                        username: 'NoaN',
                        fullname: 'Noa Nissim',
                        imgUrl: '',
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: '',
                     },
                  ],
                  labels: [
                     {
                        id: 'l102',
                        title: '',
                        color: 'yellow',
                     },
                     {
                        id: 'l103',
                        title: 'Flexible',
                        color: 'orange',
                     },
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                  },
                  dueDate: {
                     date: '14 Dec 2021',
                     isComplete: false,
                  },
                  comments: [
                     {
                        txt: 'Please work on trackero',
                        id: 'c100',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Matan Crispel',
                           _id: 'u104',
                        },
                     },
                  ],
               },
               {
                  id: 't102',
                  title: 'Project trackero task 102',
                  style: {
                     bgColor: '#ffffff',
                  },
                  members: [
                     {
                        _id: 'u103',
                        username: 'NoaN',
                        fullname: 'Noa Nissim',
                        imgUrl: '',
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: '',
                     },
                  ],
                  labels: [
                     {
                        id: 'l102',
                        title: '',
                        color: 'yellow',
                     },
                     {
                        id: 'l103',
                        title: 'Flexible',
                        color: 'orange',
                     },
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                  },
                  dueDate: {
                     date: '15 Dec 2021',
                     isComplete: false,
                  },
                  comments: [
                     {
                        txt: 'Please work on trackero task',
                        id: 'c101',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Matan Crispel',
                           _id: 'u104',
                        },
                     },
                  ],
               },
            ],
            style: {
               bgColor: '#ebecf0',
            },
         },
         {
            id: 'g102',
            title: 'Develop trackero',
            tasks: [
               {
                  id: 't103',
                  title: 'Project trackero task',
                  style: {
                     bgColor: '#ffffff',
                  },
                  members: [
                     {
                        _id: 'u103',
                        username: 'NoaN',
                        fullname: 'Noa Nissim',
                        imgUrl: '',
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: '',
                     },
                  ],
                  labels: [
                     {
                        id: 'l102',
                        title: '',
                        color: 'yellow',
                     },
                     {
                        id: 'l103',
                        title: 'Flexible',
                        color: 'orange',
                     },
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                  },
                  dueDate: {
                     date: '14 Dec 2021',
                     isComplete: false,
                  },
                  comments: [
                     {
                        txt: 'Please work on trackero',
                        id: 'c100',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Matan Crispel',
                           _id: 'u104',
                        },
                     },
                  ],
               },
               {
                  id: 't104',
                  title: 'Project trackero task 104',
                  style: {
                     bgColor: '#ffffff',
                  },
                  members: [
                     {
                        _id: 'u103',
                        username: 'NoaN',
                        fullname: 'Noa Nissim',
                        imgUrl: '',
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: '',
                     },
                  ],
                  labels: [
                     {
                        id: 'l102',
                        title: '',
                        color: 'yellow',
                     },
                     {
                        id: 'l103',
                        title: 'Flexible',
                        color: 'orange',
                     },
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                  },
                  dueDate: {
                     date: '15 Dec 2021',
                     isComplete: false,
                  },
                  comments: [
                     {
                        txt: 'Please work on trackero task',
                        id: 'c101',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Matan Crispel',
                           _id: 'u104',
                        },
                     },
                  ],
               },
            ],
            style: {
               bgColor: '#ebecf0',
            },
         },
      ],
      activities: [
         {
            txt: 'Added task "Finalize Campaign Name: WeTaskBigger" to list: Done',
            createdAt: Date.now(),
            byMember: {
               _id: 'u100',
               fullname: 'Guest',
               username: 'guest',
               imgUrl: '',
            },
            task: {
               id: 't100',
               title: 'Finalize Campaign Name: WeTaskBigger',
               style: {
                  bgColor: '#ffffff',
               },
               labels: [],
               members: [
                  {
                     _id: 'u102',
                     username: 'ArtiomB',
                     fullname: 'Artiom Bukati',
                     imgUrl: '',
                  },
               ],
            },
            id: 'a100',
         },
      ],
   }
}
