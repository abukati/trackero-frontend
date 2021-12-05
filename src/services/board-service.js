import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'
import { SOCKET_EVENT_BOARD_ADDED, socketService } from './socket-service.js'

const KEY = 'boardsDB'

// const BASE_URL = process.env.NODE_ENV !== 'development' ? '/api/board/' : '//localhost:3000/api/board/'
// const axios = require('axios')

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
   addTaskMember,
   //MEMBER
   addMember,
   removeMember
}

//----------------------------------------------------------- */
//********************BOARD*********************************
//----------------------------------------------------------- */

var gBoards = _createBoards()
// let currBoard = null

async function query() {
   try {
      return await storageService.query(KEY)
   } catch (err) {
      console.log(err)
   }
}

function _deep(board) {
   return JSON.parse(JSON.stringify(board))
}

// async function getCurrBoard() {
// 	try {
// 		return JSON.parse(JSON.stringify(currBoard))
// 	} catch (err) {
// 		console.log(err)
// 	}
// }

async function getById(boardId) {
   try {
      const currBoard = await storageService.get(KEY, boardId)
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

function getEmptyBoard(title, user = { _id: 'u100', username: 'guest', fullname: 'guest', imgUrl: '' }) {
   const board = {
      title,
      createdAt: Date.now(),
      isStarred,
      createdBy: {
         _id: user._id,
         username: user.username,
         fullname: user.fullname,
         imgUrl: user.imgUrl,
         isAdmin: true
      },
      style: {
         bgColor: '#29cce5',
         bgImg: ''
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
   return board
}

function getEmptyGroup(title = 'Default group title') {
   const group = {
      id: utilService.makeId(),
      title,
      tasks: [],
      style: {
         bgColor: '#ebecf0'
      }
   }
   return group
}

async function _createBoards() {
   var boards = JSON.parse(localStorage.getItem(KEY))
   if (!boards || !boards.length) {
      boards = [_createBoard('Software development'), _createBoard('Project management'), _createBoard('Business board')]
      localStorage.setItem(KEY, JSON.stringify(boards))
   }
   return boards
}

async function changeBoardBgc(bgc, board) {
   try {
      const currBoard = _deep(board)
      currBoard.style.bgColor = bgc
      save(currBoard)
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
      return currGroup
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
      return currBoard.groups
   } catch (err) {
      console.log(err)
   }
}

async function updateGroupTitle(group, board) {
   try {
      const groupToUpdate = await _getCurrGroup(group.id, board)
      groupToUpdate.title = group.title
      await _updateGroup(groupToUpdate, groupToUpdate.id, board)
      return groupToUpdate
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
      description: 'This is the task description',
      attachments: [],
      location: {},
      style: {
         // bgColor: '#0a9'
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
      dueDate: {
         date: '14 Dec 2021',
         isComplete: false
      },
      comments: []
   }
}

async function addTaskMember(task,groupId,user,board){
   try{
      const currGroup = await _getCurrGroup(groupId, board)
      const taskIdx = currGroup.tasks.findIndex(currTask=> currTask.id === task.id)
      currGroup.tasks[taskIdx].members.push(user)
      return await _updateGroup(currGroup, groupId, board)
   }catch(err){
      console.log(err)
   }
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

(async () => {
   var boards = await storageService.query(KEY)
   var groups = boards[0].groups

   window.addEventListener('storage', async () => {
      console.log('Storage updated')
      const newBoards = await storageService.query(KEY)
      const newGroups = newBoards[0].groups
      if (newGroups.length === groups.length + 1) {
         console.log('Review Added - localStorage updated from another browser')
         socketService.emit(SOCKET_EVENT_BOARD_ADDED, newGroups[newGroups.length - 1])
      }
      boards = newGroups
   })
})()

function _createBoard(title, user = { _id: 'u100', username: 'guest', fullname: 'guest', imgUrl: '' }) {
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
      isStarred: true,
      style: {
         bgColor: '#29cce5',
         bgImg: ''
      },
      labels: [
         {
            id: 'l101',
            title: 'Done',
            color: '#61bd4f'
         },
         {
            id: 'l102',
            title: 'Attention',
            color: '#f2d600'
         },
         {
            id: 'l103',
            title: 'Critical',
            color: '#ff9f1a'
         },
         {
            id: 'l104',
            title: 'Bug',
            color: '#eb5a46'
         },
         {
            id: 'l105',
            title: 'On it',
            color: '#c377e0'
         },
         {
            id: 'l106',
            title: 'Idea',
            color: '#0079bf'
         },
         {
            id: 'l107',
            title: 'Urgent',
            color: '#344563'
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
            imgUrl: '',
            isAdmin: true
         },
         {
            _id: 'u102',
            username: 'ArtiomB',
            fullname: 'Artiom Bukati',
            imgUrl: ''
         },
         {
            _id: 'u103',
            username: 'NoaN',
            fullname: 'Noa Nissim',
            imgUrl: ''
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
                        imgUrl: ''
                     },
                     {
                        _id: 'u102',
                        username: 'ArtiomB',
                        fullname: 'Artiom Bukati',
                        imgUrl: ''
                     }
                  ],
                  labels: [
                     {
                        id: 'l101',
                        title: 'Done',
                        color: '#61bd4f'
                     },
                     {
                        id: 'l102',
                        title: 'Attention',
                        color: '#f2d600'
                     },
                     {
                        id: 'l103',
                        title: 'Critical',
                        color: '#ff9f1a'
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
                     date: '5 Dec 2021',
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
                  ]
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
                        imgUrl: ''
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: '',
                        isAdmin: true
                     },
                  ],
                  labels: [
                     {
                        id: 'l104',
                        title: 'Bug',
                        color: '#eb5a46'
                     },
                     {
                        id: 'l105',
                        title: 'On it',
                        color: '#c377e0'
                     },
                     {
                        id: 'l106',
                        title: 'Idea',
                        color: '#0079bf'
                     },
                     {
                        id: 'l107',
                        title: 'Urgent',
                        color: '#344563'
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
                     date: '6 Dec 2021',
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
                  ]
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
                        imgUrl: ''
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: '',
                        isAdmin: true
                     }
                  ],
                  labels: [
                     // {
                     //    id: 'l104',
                     //    title: 'Bug',
                     //    color: '#eb5a46'
                     // },
                     // {
                     //    id: 'l105',
                     //    title: 'On it',
                     //    color: '#c377e0'
                     // },
                     // {
                     //    id: 'l106',
                     //    title: 'Idea',
                     //    color: '#0079bf'
                     // },
                     {
                        id: 'l107',
                        title: 'Urgent',
                        color: '#344563'
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
                     date: '8 Dec 2021',
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
                  ]
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
                        imgUrl: ''
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: '',
                        isAdmin: true
                     }
                  ],
                  labels: [
                     // {
                     //    id: 'l104',
                     //    title: 'Bug',
                     //    color: '#eb5a46'
                     // },
                     // {
                     //    id: 'l105',
                     //    title: 'On it',
                     //    color: '#c377e0'
                     // },
                     {
                        id: 'l106',
                        title: 'Idea',
                        color: '#0079bf'
                     }
                     // {
                     //    id: 'l107',
                     //    title: 'Urgent',
                     //    color: '#344563'
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
                     date: '10 Dec 2021',
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
                  ]
               }
            ],
            style: {
               bgColor: '#ebecf0'
            }
         },
         {
            id: 'g102',
            title: 'Development',
            tasks: [
               {
                  id: 't103',
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
                        imgUrl: ''
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: '',
                        isAdmin: true
                     }
                  ],
                  labels: [
                     {
                        id: 'l103',
                        title: 'Critical',
                        color: '#ff9f1a'
                     },
                     {
                        id: 'l104',
                        title: 'Bug',
                        color: '#eb5a46'
                     },
                     {
                        id: 'l105',
                        title: 'On it',
                        color: '#c377e0'
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
                     date: '15 Dec 2021',
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
                  ]
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
                        imgUrl: ''
                     },
                     {
                        _id: 'u102',
                        username: 'ArtiomB',
                        fullname: 'Artiom Bukati',
                        imgUrl: ''
                     }
                  ],
                  labels: [
                     {
                        id: 'l101',
                        title: 'Done',
                        color: '#61bd4f'
                     },
                     {
                        id: 'l104',
                        title: 'Bug',
                        color: '#eb5a46'
                     },
                     {
                        id: 'l105',
                        title: 'On it',
                        color: '#c377e0'
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
                     date: '8 Dec 2021',
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
                  ]
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
                        imgUrl: ''
                     },
                     {
                        _id: 'u101',
                        username: 'BaselB',
                        fullname: 'Basel Boulos',
                        imgUrl: '',
                        isAdmin: true
                     },
                     {
                        _id: 'u102',
                        username: 'ArtiomB',
                        fullname: 'Artiom Bukati',
                        imgUrl: ''
                     }
                  ],
                  labels: [
                     {
                        id: 'l105',
                        title: 'On it',
                        color: '#c377e0'
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
                     date: '28 Dec 2021',
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
                  ]
               }
            ],
            style: {
               bgColor: '#ebecf0'
            }
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
                        imgUrl: ''
                     }
                  ],
                  labels: [
                     {
                        id: 'l103',
                        title: 'Critical',
                        color: '#ff9f1a'
                     },
                     {
                        id: 'l104',
                        title: 'Bug',
                        color: '#eb5a46'
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
                     date: '27 Dec 2021',
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
                  ]
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
                        imgUrl: ''
                     },
                     {
                        _id: 'u102',
                        username: 'ArtiomB',
                        fullname: 'Artiom Bukati',
                        imgUrl: ''
                     }
                  ],
                  labels: [
                     {
                        id: 'l101',
                        title: 'Done',
                        color: '#61bd4f'
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
                     date: '16 Dec 2021',
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
                  ]
               },
               {
                  id: 't108',
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
                        imgUrl: '',
                        isAdmin: true
                     }
                  ],
                  labels: [
                     {
                        id: 'l101',
                        title: 'Done',
                        color: '#61bd4f'
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
                     date: '9 Dec 2021',
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
                  ]
               }
            ],
            style: {
               bgColor: '#ebecf0'
            }
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
                     color: '#ff9f1a'
                  },
                  {
                     id: 'l105',
                     title: 'On it',
                     color: '#c377e0'
                  },
                  {
                     id: 'l106',
                     title: 'Idea',
                     color: '#0079bf'
                  },
                  {
                     id: 'l107',
                     title: 'Urgent',
                     color: '#344563'
                  }
               ],
               members: [
                  {
                     _id: 'u102',
                     username: 'ArtiomB',
                     fullname: 'Artiom Bukati',
                     imgUrl: ''
                  }
               ]
            },
            id: 'a100'
         }
      ]
   }
}