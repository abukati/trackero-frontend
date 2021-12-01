import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'
import { boardService } from './board-service.js'
export const groupService = {
   save,
   remove,
   removeGroup,
   saveSortedGroups,
   getClonedGroup,
}

const KEY = 'boardsDB'
var gGroups

// current doesn't save a new group, only replaces the whole board
function _add(group) {
   return storageService.post(KEY, group)
}

function _update(group) {
   return storageService.put(KEY, group)
}

function _getCurrGroup() {
   gGroups = storageService.query(KEY).map()
}

function removeGroup(boardId) {
   console.log('here')
   console.log(gBoards)
   console.log('boardId', boardId)
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

async function saveSortedGroups(groups) {
   const board = await boardService.getCurrBoard()
   board.groups = groups
   return board
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
