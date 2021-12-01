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
   getClonedBoard,
   addGroup,
   removeGroup,
   saveGroups,
   getClonedGroup,
}

//----------------------------------------------------------- */
//********************BOARD*********************************
//----------------------------------------------------------- */

var gBoards = _createBoards()
let currBoard = null

async function query() {
   try {
      return await storageService.query(KEY)
   } catch (err) {
      console.log(err)
   }
}

async function getCurrBoard() {
   try {
      return currBoard
   } catch (err) {
      console.log(err)
   }
}

async function getById(boardId) {
   try {
      currBoard = await storageService.get(KEY, boardId)
      return currBoard
   } catch (err) {
      console.log(err)
   }
}

async function remove(boardId) {
   try {
      return await storageService.remove(KEY, boardId)
   } catch (err) {
      console.log(err)
   }
}

async function save(board) {
   try {
      const savedBoard = board._id ? await _update(board) : await _add(board)
      return savedBoard
   } catch (err) {
      console.log(err)
   }
}

async function _add(board) {
   try {
      return await storageService.post(KEY, board)
   } catch (err) {
      console.log(err)
   }
}

async function _update(board) {
   try {
      return await storageService.put(KEY, board)
   } catch (err) {
      console.log(err)
   }
}

function getEmptyBoard() {
   const board = _createBoard('Create Board', { _id: 'u100', username: 'guest', fullname: 'guest', imgUrl: '' })
   return board
}

async function _createBoards() {
   var boards = JSON.parse(localStorage.getItem(KEY))
   if (!boards || !boards.length) {
      boards = [
         _createBoard('Software development'),
         _createBoard('Project management'),
         _createBoard('Business board'),
      ]
      localStorage.setItem(KEY, JSON.stringify(boards))
   }
   return boards
}

//----------------------------------------------------------- */
//***********************GROUPS********************************
//----------------------------------------------------------- */

async function addGroup(group) {
   try {
      const currBoardGroups = await getCurrBoard().groups
      currBoardGroups.push(group)
      saveGroups(currBoardGroups)
      return currBoardGroups
   } catch (err) {
      console.log(err)
   }
}

async function removeGroup(id) {
   try {
      const currBoard = await getCurrBoard()
      let currGroups = currBoard.groups
      let idx = currGroups.findIndex((group) => group.id === id)
      currGroups.splice(idx, 1)
      saveGroups(currGroups)
      return idx
   } catch (err) {
      console.log(err)
   }
}

async function saveGroups(groups) {
   try {
      const board = await getCurrBoard()
      board.groups = JSON.parse(JSON.stringify(groups))
      save(board)
      return board
   } catch (err) {
      console.log(err)
   }
}

function getClonedBoard(
   title,
   user = {
      _id: 'u101',
      username: 'BaselB',
      fullname: 'Basel Boulos',
      imgUrl: '',
   }
) {
   return {
      // _id: utilService.makeId(),
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
                  id: 't102',
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
                  id: 't103',
                  title: 'Project trackero task 103',
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

function _createBoard(
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

function getClonedGroup() {
   const group = {
      id: utilService.makeId(),
      title: 'Develop trackero Cloned',
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
   }
   return group
}
