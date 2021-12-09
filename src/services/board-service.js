import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'
import { SOCKET_EVENT_BOARD_ADDED, socketService } from './socket-service.js'
import { httpService } from './http-service.js'

const KEY = 'board_db'

const BASE_URL = process.env.NODE_ENV !== 'development' ? '/api/board/' : '//localhost:3000/api/board/'
const axios = require('axios')

export const boardService = {
   //BOARD
   query,
   getById,
   remove,
   save,
   getEmptyBoard,
   changeBoardBgc,
   //GROUP
   addGroup,
   removeGroup,
   saveGroups,
   getEmptyGroup,
   updateGroupTitle,
   //TASK
   createTask,
   updateTasks,
   saveTask,
   updateSingleTask,
   getEmptyTodo,
   getEmptyChecklist,
   getEmptyComment,
   //MEMBER
   addMember,
   removeMember
}

//----------------------------------------------------------- */
//********************BOARD*********************************
//----------------------------------------------------------- */

// var gBoards = _createBoards()

async function query(filterBy = {}) {
   try {
      //FE
      // return await storageService.query(KEY)
      //BE
      const res = await httpService.get('board', { params: filterBy })
      return res
   } catch (err) {
      console.log(err)
   }
}

function _deep(board) {
   return JSON.parse(JSON.stringify(board))
}

async function getById(boardId) {
   try {
      //FE
      // const currBoard = await storageService.get(KEY, boardId)
      // return currBoard
      //BE
      const res = await httpService.get('board/' + boardId)
      return res
   } catch (err) {
      console.log(err)
   }
}

async function remove(boardId) {
   try {
      //FE
      // return await storageService.remove(KEY, boardId)
      //BE
      const res = await httpService.delete('board/' + boardId, { withCredentials: true })
      return res
   } catch (err) {
      console.log(err)
   }
}

async function save(board) {
   try {
      //FE
      // const savedBoard = board._id ? await _update(board) : await _add(board)
      // return savedBoard
      //BE
      if (board._id) {
         const res = await httpService.put('board/' + board._id, board, { withCredentials: true })
         return res
      } else {
         const res = await httpService.post('board/', board, { withCredentials: true })
         return res
      }
   } catch (err) {
      console.log(err)
   }
}

//FE ONLY
async function _add(board) {
   try {
      return await storageService.post(KEY, board)
   } catch (err) {
      console.log(err)
   }
}

//FE ONLY
async function _update(board) {
   try {
      return await storageService.put(KEY, board)
   } catch (err) {
      console.log(err)
   }
}

// async function updateArchiveTasks(task,groupId,boardId){
//    const board = await getById(boardId)
//    board.archivedTasks.push()
// }

function getEmptyBoard(title, user = { _id: 'u100', username: 'guest', fullname: 'guest', imgUrl: '' }) {
   const board = {
      title,
      createdAt: Date.now(),
      createdBy: {
         _id: user._id,
         username: user.username,
         fullname: user.fullname,
         imgUrl: user.imgUrl,
         isAdmin: true
      },
      style: {
         bgColor: ''
      },
      labels: [],
      members: [],
      groups: [
         {
            id: utilService.makeId(),
            title: 'Default group title',
            tasks: [],
            style: {
               bgColor: '#ebecf0'
            }
         }
      ],
      activities: []
   }
   //FE
   // return board
   //BE
   return Promise.resolve(board)
}

function getEmptyGroup(title = 'Default group title') {
   const group = {
      id: utilService.makeId(),
      title,
      tasks: []
   }
   //FE
   // return group
   //BE
   return Promise.resolve(group)
}

//FE ONLY
async function _createBoards() {
   var boards = JSON.parse(localStorage.getItem(KEY))
   if (!boards || !boards.length) {
      boards = [
         _createBoard('#00aecc', 'Software development'),
         _createBoard('#d29034', 'Team management'),
         _createBoard('#519839', 'Business'),
         _createBoard('#b04632', 'Remote work'),
         _createBoard('#89609e', 'Project management'),
         _createBoard('#cd5a91', 'Business board')
      ]
      localStorage.setItem(KEY, JSON.stringify(boards))
   }
   return boards
}

async function changeBoardBgc(bgc, board) {
   try {
      const currBoard = _deep(board)
      currBoard.style.bgColor = bgc
      //FE
      // return save(currBoard)
      //BE
      return Promise.resolve(save(currBoard))
   } catch (err) {
      console.log(err)
   }
}

//----------------------------------------------------------- */
//***********************GROUPS********************************
//----------------------------------------------------------- */
async function _getCurrGroup(groupId, board) {
   try {
      // const currBoard = await getCurrBoard()
      const currBoard = _deep(board)
      const currGroup = currBoard.groups.find(group => group.id === groupId)
      //FE
      // return currGroup
      //BE
      return Promise.resolve(currGroup)
   } catch (err) {
      console.log(err)
   }
}

async function addGroup(group, board) {
   try {
      // const currBoard = await getCurrBoard()
      const currBoard = _deep(board)
      currBoard.groups.push(group)
      saveGroups(currBoard.groups, currBoard)
      //FE
      // return currBoard.groups
      //BE
      return Promise.resolve(currBoard.groups)
   } catch (err) {
      console.log(err)
   }
}

async function updateGroupTitle(group, board) {
   try {
      const groupToUpdate = await _getCurrGroup(group.id, board)
      groupToUpdate.title = group.title
      await _updateGroup(groupToUpdate, groupToUpdate.id, board)
      //FE
      // return groupToUpdate
      //BE
      return Promise.resolve(groupToUpdate)
   } catch (err) {
      console.log(err)
   }
}

async function _updateGroup(updatedGroup, groupId, board) {
   try {
      // const currBoard = await getCurrBoard()
      const currBoard = _deep(board)
      currBoard.groups.forEach((group, idx, array) => {
         if (array[idx].id === groupId) array[idx] = updatedGroup
      })
      saveGroups(currBoard.groups, currBoard)
      return updatedGroup
   } catch (err) {
      console.log(err)
   }
}

async function removeGroup(id, board) {
   try {
      // const currBoard = await getCurrBoard()
      const currBoard = _deep(board)
      let currGroups = currBoard.groups
      let idx = currGroups.findIndex(group => group.id === id)
      currGroups.splice(idx, 1)
      saveGroups(currGroups, currBoard)
      return idx
   } catch (err) {
      console.log(err)
   }
}

async function saveGroups(groups, board) {
   try {
      // const board = await getCurrBoard()
      const deepBoard = _deep(board)
      deepBoard.groups = groups
      const savedBoard = save(deepBoard)
      return savedBoard
   } catch (err) {
      console.log(err)
   }
}

//----------------------------------------------------------- */
//***********************TASKS********************************
//----------------------------------------------------------- */

function createTask(title) {
   let task = _createEmptyTask()
   task.title = title
   return task
}

async function saveTask(task, groupId, board) {
   try {
      const currGroup = await _getCurrGroup(groupId, board)
      currGroup.tasks.push(task)
      _updateGroup(currGroup, groupId, board)
      return task
   } catch (err) {
      console.log(err)
   }
}

async function removeTask(task, groupId, board) {}

async function updateSingleTask(task, board, groupId) {
   try {
      const currGroup = await _getCurrGroup(groupId, board)
      const taskIdx = currGroup.tasks.findIndex(currTask => currTask.id === task.id)
      currGroup.tasks[taskIdx] = task
      const updatedGroup = await _updateGroup(currGroup, currGroup.id, board)
      return updatedGroup.tasks[taskIdx]
   } catch (err) {
      console.log(err)
   }
}

async function updateTasks(tasks, group, board) {
   try {
      const currGroup = await _getCurrGroup(group.id, board)
      currGroup.tasks = tasks
      return await _updateGroup(currGroup, currGroup.id, board)
   } catch (err) {
      console.log(err)
   }
}

function _createEmptyTask() {
   return {
      id: utilService.makeId(),
      title: '',
      description: '',
      attachments: [],
      location: {},
      style: {
         bgColor: '#ffffff'
      },
      members: [],
      labels: [],
      byUser: {
         _id: 'u100',
         fullname: 'Guest',
         username: 'guest',
         imgUrl: ''
      },
      startDate: {
         date: '',
         isComplete: false
      },
      dueDate: {
         date: '',
         isComplete: false
      },
      comments: [],
      isArchived: false,
      checklists: []
   }
}

function getEmptyComment() {
   const comment = {
      txt: '',
      id: utilService.makeId(),
      createdAt: Date.now(),
      byMember: {
         fullname: '',
         _id: ''
      }
   }
   return comment
}

function getEmptyTodo() {
   const todo = {
      id: utilService.makeId(),
      text: '',
      isDone: false
   }
   return todo
}

function getEmptyChecklist() {
   const todo = {
      id: utilService.makeId(),
      title: '',
      todos: []
   }
   return todo
}

//----------------------------------------------------------- */
//***********************MEMBERS********************************
//----------------------------------------------------------- */

async function addMember(user, board) {
   try {
      // const board = await getCurrBoard()
      const deepBoard = _deep(board)
      const idx = deepBoard.members.findIndex(member => member._id === user._id)
      if (idx !== -1) {
         console.log('Member is already in the board')
         return
      } else {
         deepBoard.members.push(user)
         save(deepBoard)
         return user
      }
   } catch (err) {
      console.log(err)
   }
}

async function removeMember(user, board) {
   try {
      // const board = await getCurrBoard()
      const deepBoard = _deep(board)
      const idx = deepBoard.members.findIndex(member => member._id === user._id)
      deepBoard.members.splice(idx, 1)
      save(deepBoard)
   } catch (err) {
      console.log(err)
   }
}

// Dummy socket for live testing

// ;(async () => {
//    var boards = await storageService.query(KEY)
//    var groups = boards[0].groups

//    window.addEventListener('storage', async () => {
//       console.log('Storage updated')
//       const newBoards = await storageService.query(KEY)
//       const newGroups = newBoards[0].groups
//       if (newGroups.length === groups.length + 1) {
//          console.log('Board Added - localStorage updated from another browser')
//          socketService.emit(SOCKET_EVENT_BOARD_ADDED, newGroups[newGroups.length - 1])
//       }
//       boards = newGroups
//    })
// })()

function _createBoard(bgColor, title, user = { _id: 'u100', username: 'guest', fullname: 'guest', imgUrl: '' }) {
   return {
      _id: utilService.makeId(),
      title,
      createdAt: Date.now(),
      createdBy: {
         _id: user._id,
         username: user.username,
         fullname: user.fullname,
         imgUrl: user.imgUrl,
         isAdmin: true
      },
      style: {
         bgColor: bgColor
      },
      isLabelsShown: true,
      labels: [
         {
            id: 'l101',
            title: 'Done',
            color: 'green'
         },
         {
            id: 'l102',
            title: 'Attention',
            color: 'yellow'
         },
         {
            id: 'l103',
            title: 'Critical',
            color: 'orange'
         },
         {
            id: 'l104',
            title: 'Bug',
            color: 'red'
         },
         {
            id: 'l105',
            title: 'On it',
            color: 'purple'
         },
         {
            id: 'l106',
            title: 'Idea',
            color: 'blue'
         },
         {
            id: 'l107',
            title: 'Urgent',
            color: 'navy'
         }
      ],
      members: [
         {
            _id: 'u100',
            username: 'guest',
            fullname: 'guest',
            imgUrl: '',
            isAdmin: true
         },
         {
            _id: 'u101',
            username: 'BaselB',
            fullname: 'Basel Boulos',
            imgUrl: 'baseluser.png',
            isAdmin: true
         },
         {
            _id: 'u102',
            username: 'ArtiomB',
            fullname: 'Artiom Bukati',
            imgUrl: 'artiomuser.png'
         },
         {
            _id: 'u103',
            username: 'NoaN',
            fullname: 'Noa Nissim',
            imgUrl: 'noauser.png'
         }
      ],
      groups: [
         {
            id: 'g101',
            title: 'In Progress',
            tasks: [
               {
                  id: 't101',
                  title: 'Work on the tasks preview UI',
                  description: 'Make the tasks on the board view look similar to rello(with the labels, badges, icons...)',
                  attachments: [
                     {
                        id: 'f101',
                        title: 'flower',
                        src: 'https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg'
                     }
                  ],
                  location: {
                     id: 'loc101',
                     title: 'Tel Aviv',
                     lat: 32.109333,
                     lng: 34.855499
                  },
                  style: {
                     bgColor: '#ff7'
                  },
                  members: [
                     {
                        _id: 'u103',
                        username: 'NoaN',
                        fullname: 'Noa Nissim',
                        imgUrl: 'noauser.png'
                     },
                     {
                        _id: 'u102',
                        username: 'ArtiomB',
                        fullname: 'Artiom Bukati',
                        imgUrl: 'artiomuser.png'
                     }
                  ],
                  labels: [
                     {
                        id: 'l101',
                        title: 'Done',
                        color: 'green'
                     },
                     {
                        id: 'l102',
                        title: 'Attention',
                        color: 'yellow'
                     },
                     {
                        id: 'l103',
                        title: 'Critical',
                        color: 'orange'
                     }
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                     isAdmin: true
                  },
                  startDate: {
                     date: '5 Dec 2021'
                  },
                  dueDate: {
                     date: '14 Dec 2021',
                     isComplete: false
                  },
                  comments: [
                     {
                        txt: 'Please work on trackero',
                        id: 'c100',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Matan Crispel',
                           _id: 'u104'
                        }
                     }
                  ],
                  checklists: [
                     {
                        id: utilService.makeId(),
                        title: 'Checklist',
                        todos: [
                           {
                              text: 'Git permissions',
                              isDone: false,
                              id: utilService.makeId()
                           },
                           {
                              text: 'AWS permissions',
                              isDone: false,
                              id: utilService.makeId()
                           },
                           {
                              text: 'Mongo permissions',
                              isDone: false,
                              id: utilService.makeId()
                           }
                        ]
                     }
                  ],
                  activities: [],
                  isArchived: false
               },
               {
                  id: 't102',
                  title: 'Board navbar',
                  description: 'Work on the navbar UI',
                  attachments: [
                     {
                        id: 'f101',
                        title: 'flower',
                        src: 'https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg'
                     }
                  ],
                  location: {
                     id: 'loc101',
                     title: 'Tel Aviv',
                     lat: 32.109333,
                     lng: 34.855499
                  },
                  style: {
                     bgColor: '#ffffff'
                  },
                  members: [
                     {
                        _id: 'u103',
                        username: 'NoaN',
                        fullname: 'Noa Nissim',
                        imgUrl: 'noauser.png'
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: 'baseluser.png',
                        isAdmin: true
                     }
                  ],
                  labels: [
                     {
                        id: 'l104',
                        title: 'Bug',
                        color: 'red'
                     },
                     {
                        id: 'l105',
                        title: 'On it',
                        color: 'purple'
                     },
                     {
                        id: 'l106',
                        title: 'Idea',
                        color: 'blue'
                     },
                     {
                        id: 'l107',
                        title: 'Urgent',
                        color: 'navy'
                     }
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                     isAdmin: true
                  },
                  startDate: {
                     date: '6 Dec 2021'
                  },
                  dueDate: {
                     date: '15 Dec 2021',
                     isComplete: false
                  },
                  comments: [
                     {
                        txt: 'Please work on taskss',
                        id: 'c101',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Matan Crispel',
                           _id: 'u104'
                        }
                     }
                  ],
                  checklists: [],
                  activities: [],
                  isArchived: false
               },
               {
                  id: 't103',
                  title: 'Implement list options',
                  description: 'Implement list options on a side modal',
                  attachments: [
                     {
                        id: 'f101',
                        title: 'flower',
                        src: 'https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg'
                     }
                  ],
                  location: {
                     id: 'loc101',
                     title: 'Tel Aviv',
                     lat: 32.109333,
                     lng: 34.855499
                  },
                  style: {
                     bgColor: '#61bd3a'
                  },
                  members: [
                     {
                        _id: 'u102',
                        username: 'ArtiomB',
                        fullname: 'Artiom Bukati',
                        imgUrl: 'artiomuser.png'
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: 'baseluser.png',
                        isAdmin: true
                     }
                  ],
                  labels: [
                     // {
                     //    id: 'l104',
                     //    title: 'Bug',
                     //    color: 'red'
                     // },
                     // {
                     //    id: 'l105',
                     //    title: 'On it',
                     //    color: 'purple'
                     // },
                     // {
                     //    id: 'l106',
                     //    title: 'Idea',
                     //    color: 'blue'
                     // },
                     {
                        id: 'l107',
                        title: 'Urgent',
                        color: 'navy'
                     }
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                     isAdmin: true
                  },
                  startDate: {
                     date: '8 Dec 2021'
                  },
                  dueDate: {
                     date: '15 Dec 2021',
                     isComplete: false
                  },
                  comments: [
                     {
                        txt: 'Please work on taskss',
                        id: 'c101',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Matan Crispel',
                           _id: 'u104'
                        }
                     }
                  ],
                  checklists: [
                     {
                        id: utilService.makeId(),
                        title: 'Checklist',
                        todos: [
                           {
                              text: 'AWS permissions',
                              isDone: false,
                              id: utilService.makeId()
                           },
                           {
                              text: 'Mongo permissions',
                              isDone: false,
                              id: utilService.makeId()
                           }
                        ]
                     }
                  ],
                  activities: [],
                  isArchived: false
               },
               {
                  id: 't108',
                  title: 'Implement menu options',
                  description: 'Implement menu options on a side modal',
                  attachments: [
                     {
                        id: 'f101',
                        title: 'flower',
                        src: 'https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg'
                     }
                  ],
                  location: {
                     id: 'loc101',
                     title: 'Tel Aviv',
                     lat: 32.109333,
                     lng: 34.855499
                  },
                  style: {
                     bgColor: '#ffffff'
                  },
                  members: [
                     {
                        _id: 'u102',
                        username: 'ArtiomB',
                        fullname: 'Artiom Bukati',
                        imgUrl: 'artiomuser.png'
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: 'baseluser.png',
                        isAdmin: true
                     }
                  ],
                  labels: [
                     // {
                     //    id: 'l104',
                     //    title: 'Bug',
                     //    color: 'red'
                     // },
                     // {
                     //    id: 'l105',
                     //    title: 'On it',
                     //    color: 'purple'
                     // },
                     {
                        id: 'l106',
                        title: 'Idea',
                        color: 'blue'
                     }
                     // {
                     //    id: 'l107',
                     //    title: 'Urgent',
                     //    color: 'navy'
                     // }
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                     isAdmin: true
                  },
                  startDate: {
                     date: '10 Dec 2021'
                  },
                  dueDate: {
                     date: '15 Dec 2021',
                     isComplete: false
                  },
                  comments: [
                     {
                        txt: 'Please work on taskss',
                        id: 'c101',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Matan Crispel',
                           _id: 'u104'
                        }
                     }
                  ],
                  checklists: [],
                  activities: [],
                  isArchived: false
               }
            ],
            style: {
               bgColor: '#ebecf0'
            },
            archivedTasks: []
         },
         {
            id: 'g102',
            title: 'Development',
            tasks: [
               {
                  id: 't109',
                  title: 'Board app',
                  description: 'Working on the appearance of the application',
                  attachments: [
                     {
                        id: 'f101',
                        title: 'flower',
                        src: 'https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg'
                     }
                  ],
                  location: {
                     id: 'loc101',
                     title: 'Tel Aviv',
                     lat: 32.109333,
                     lng: 34.855499
                  },
                  style: {
                     bgColor: '#ff7'
                  },
                  members: [
                     {
                        _id: 'u103',
                        username: 'NoaN',
                        fullname: 'Noa Nissim',
                        imgUrl: 'noauser.png'
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: 'baseluser.png',
                        isAdmin: true
                     }
                  ],
                  labels: [
                     {
                        id: 'l103',
                        title: 'Critical',
                        color: 'orange'
                     },
                     {
                        id: 'l104',
                        title: 'Bug',
                        color: 'red'
                     },
                     {
                        id: 'l105',
                        title: 'On it',
                        color: 'purple'
                     }
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                     isAdmin: true
                  },
                  startDate: {
                     date: '15 Dec 2021'
                  },
                  dueDate: {
                     date: '14 Dec 2021',
                     isComplete: false
                  },
                  comments: [
                     {
                        txt: 'Please be creative with dummy data',
                        id: 'c100',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Matan Crispel',
                           _id: 'u104'
                        }
                     }
                  ],
                  checklists: [
                     {
                        id: utilService.makeId(),
                        title: 'Checklist',
                        todos: [
                           {
                              text: 'Git permissions',
                              isDone: true,
                              id: utilService.makeId()
                           },
                           {
                              text: 'AWS permissions',
                              isDone: true,
                              id: utilService.makeId()
                           },
                           {
                              text: 'Mongo permissions',
                              isDone: true,
                              id: utilService.makeId()
                           }
                        ]
                     },
                     {
                        id: utilService.makeId(),
                        title: 'Checklist',
                        todos: [
                           {
                              text: 'Git permissions2',
                              isDone: true,
                              id: utilService.makeId()
                           },
                           {
                              text: 'AWS permissions2',
                              isDone: false,
                              id: utilService.makeId()
                           },
                           {
                              text: 'Mongo permissions2',
                              isDone: false,
                              id: utilService.makeId()
                           }
                        ]
                     }
                  ],
                  activities: [],
                  isArchived: false
               },
               {
                  id: 't104',
                  title: 'Tasks CRUDL',
                  description: 'Must work on the task CRUDL',
                  attachments: [
                     {
                        id: 'f101',
                        title: 'flower',
                        src: 'https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg'
                     }
                  ],
                  location: {
                     id: 'loc101',
                     title: 'Tel Aviv',
                     lat: 32.109333,
                     lng: 34.855499
                  },
                  style: {
                     bgColor: '#ffffff'
                  },
                  members: [
                     {
                        _id: 'u103',
                        username: 'NoaN',
                        fullname: 'Noa Nissim',
                        imgUrl: 'noauser.png'
                     },
                     {
                        _id: 'u102',
                        username: 'ArtiomB',
                        fullname: 'Artiom Bukati',
                        imgUrl: 'artiomuser.png'
                     }
                  ],
                  labels: [
                     {
                        id: 'l101',
                        title: 'Done',
                        color: 'green'
                     },
                     {
                        id: 'l104',
                        title: 'Bug',
                        color: 'red'
                     },
                     {
                        id: 'l105',
                        title: 'On it',
                        color: 'purple'
                     }
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                     isAdmin: true
                  },
                  startDate: {
                     date: '8 Dec 2021'
                  },
                  dueDate: {
                     date: '15 Dec 2021',
                     isComplete: false
                  },
                  comments: [
                     {
                        txt: 'Guys you are pissing me off',
                        id: 'c101',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Yaron Bitton',
                           _id: 'u104'
                        }
                     }
                  ],
                  checklists: [],
                  activities: [],
                  isArchived: false
               },
               {
                  id: 't105',
                  title: 'Activities',
                  description: 'Must work on the activities',
                  attachments: [
                     {
                        id: 'f101',
                        title: 'flower',
                        src: 'https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg'
                     }
                  ],
                  location: {
                     id: 'loc101',
                     title: 'Tel Aviv',
                     lat: 32.109333,
                     lng: 34.855499
                  },
                  style: {
                     bgColor: '#ffffff'
                  },
                  members: [
                     {
                        _id: 'u103',
                        username: 'NoaN',
                        fullname: 'Noa Nissim',
                        imgUrl: 'noauser.png'
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: 'baseluser.png',
                        isAdmin: true
                     },
                     {
                        _id: 'u102',
                        username: 'ArtiomB',
                        fullname: 'Artiom Bukati',
                        imgUrl: 'artiomuser.png'
                     }
                  ],
                  labels: [
                     {
                        id: 'l105',
                        title: 'On it',
                        color: 'purple'
                     }
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                     isAdmin: true
                  },
                  startDate: {
                     date: '28 Dec 2021'
                  },
                  dueDate: {
                     date: '9 Dec 2021',
                     isComplete: false
                  },
                  comments: [
                     {
                        txt: 'Guys you are pissing me off',
                        id: 'c101',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Yaron Bitton',
                           _id: 'u104'
                        }
                     }
                  ],
                  checklists: [],
                  activities: [],
                  isArchived: false
               }
            ],
            style: {
               bgColor: '#ebecf0'
            },
            archivedTasks: []
         },
         {
            id: 'g103',
            title: 'Done',
            tasks: [
               {
                  id: 't106',
                  title: 'Drag & Drop of lists and tasks',
                  description: 'Working on the Drag & Drop of lists and tasks',
                  attachments: [
                     {
                        id: 'f101',
                        title: 'flower',
                        src: 'https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg'
                     }
                  ],
                  location: {
                     id: 'loc101',
                     title: 'Tel Aviv',
                     lat: 32.109333,
                     lng: 34.855499
                  },
                  style: {
                     bgColor: '#c377e0'
                  },
                  members: [
                     {
                        _id: 'u102',
                        username: 'ArtiomB',
                        fullname: 'Artiom Bukati',
                        imgUrl: 'artiomuser.png'
                     }
                  ],
                  labels: [
                     {
                        id: 'l103',
                        title: 'Critical',
                        color: 'orange'
                     },
                     {
                        id: 'l104',
                        title: 'Bug',
                        color: 'red'
                     }
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                     isAdmin: true
                  },
                  startDate: {
                     date: '27 Dec 2021'
                  },
                  dueDate: {
                     date: '14 Dec 2021',
                     isComplete: false
                  },
                  comments: [
                     {
                        txt: 'Please be creative with dummy data',
                        id: 'c100',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Matan Crispel',
                           _id: 'u104'
                        }
                     }
                  ],
                  checklists: [],
                  activities: [],
                  isArchived: false
               },
               {
                  id: 't107',
                  title: 'List CRUDL and design',
                  description: 'Must work on the list CRUDL and design',
                  attachments: [
                     {
                        id: 'f101',
                        title: 'flower',
                        src: 'https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg'
                     }
                  ],
                  location: {
                     id: 'loc101',
                     title: 'Tel Aviv',
                     lat: 32.109333,
                     lng: 34.855499
                  },
                  style: {
                     bgColor: '#ff7'
                  },
                  members: [
                     {
                        _id: 'u103',
                        username: 'NoaN',
                        fullname: 'Noa Nissim',
                        imgUrl: 'noauser.png'
                     },
                     {
                        _id: 'u102',
                        username: 'ArtiomB',
                        fullname: 'Artiom Bukati',
                        imgUrl: 'artiomuser.png'
                     }
                  ],
                  labels: [
                     {
                        id: 'l101',
                        title: 'Done',
                        color: 'green'
                     }
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                     isAdmin: true
                  },
                  startDate: {
                     date: '16 Dec 2021'
                  },
                  dueDate: {
                     date: '15 Dec 2021',
                     isComplete: false
                  },
                  comments: [
                     {
                        txt: 'Guys you are pissing me off',
                        id: 'c101',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Yaron Bitton',
                           _id: 'u104'
                        }
                     }
                  ],
                  checklists: [],
                  activities: [],
                  isArchived: false
               },
               {
                  id: 't110',
                  title: 'Members invite styling',
                  description: 'Must work on the members invite styling',
                  attachments: [
                     {
                        id: 'f101',
                        title: 'flower',
                        src: 'https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg'
                     }
                  ],
                  location: {
                     id: 'loc101',
                     title: 'Tel Aviv',
                     lat: 32.109333,
                     lng: 34.855499
                  },
                  style: {
                     bgColor: '#ff7'
                  },
                  members: [
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: 'baseluser.png',
                        isAdmin: true
                     }
                  ],
                  labels: [
                     {
                        id: 'l101',
                        title: 'Done',
                        color: 'green'
                     }
                  ],
                  byUser: {
                     _id: 'u100',
                     fullname: 'Guest',
                     username: 'guest',
                     imgUrl: '',
                     isAdmin: true
                  },
                  startDate: {
                     date: '9 Dec 2021'
                  },
                  dueDate: {
                     date: '9 Dec 2021',
                     isComplete: false
                  },
                  comments: [
                     {
                        txt: 'Guys you are pissing me off',
                        id: 'c101',
                        createdAt: Date.now(),
                        byMember: {
                           fullname: 'Yaron Bitton',
                           _id: 'u104'
                        }
                     }
                  ],
                  checklists: [],
                  activities: [],
                  isArchived: false
               }
            ],
            style: {
               bgColor: '#ebecf0'
            },
            archivedTasks: []
         }
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
               isAdmin: true
            },
            task: {
               id: 't100',
               title: 'Finalize Campaign Name: WeTaskBigger',
               description: 'This is the task description',
               attachments: [
                  {
                     id: 'f101',
                     title: 'flower',
                     src: 'https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg'
                  }
               ],
               location: {
                  id: 'loc101',
                  title: 'Tel Aviv',
                  lat: 32.109333,
                  lng: 34.855499
               },
               style: {
                  bgColor: '#ff7'
               },
               labels: [
                  {
                     id: 'l103',
                     title: 'Critical',
                     color: 'orange'
                  },
                  {
                     id: 'l105',
                     title: 'On it',
                     color: 'purple'
                  },
                  {
                     id: 'l106',
                     title: 'Idea',
                     color: 'blue'
                  },
                  {
                     id: 'l107',
                     title: 'Urgent',
                     color: '#navy'
                  }
               ],
               members: [
                  {
                     _id: 'u102',
                     username: 'ArtiomB',
                     fullname: 'Artiom Bukati',
                     imgUrl: 'artiomuser.png'
                  }
               ]
            },
            id: 'a100'
         }
      ]
   }
}