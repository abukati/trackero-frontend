import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'

const KEY = 'usersDB'

export const userService = {
   query,
   getUserById,
   getEmptyUser,
   save
}

var gUsers = _createUsers()

async function query() {
   try {
      return await storageService.query(KEY)
   } catch (err) {
      console.log(err)
   }
}

async function getUserById(userId) {
   try {
      const users = await query()
      return users.find(user => user._id === userId)
   } catch (err) {
      console.log(err)
   }
}

async function save(user) {
   try {
      const savedUser = user._id ? await _update(user) : await _add(user)
      return savedUser
   } catch (err) {
      console.log(err)
   }
}

async function _add(user) {
   try {
      return await storageService.post(KEY, user)
   } catch (err) {
      console.log(err)
   }
}

async function _update(user) {
   try {
      return await storageService.put(KEY, user)
   } catch (err) {
      console.log(err)
   }
}

function _createUsers() {
   var users = JSON.parse(localStorage.getItem(KEY))
   if (!users || !users.length) {
      users = [
         _createUser('u100', 'guest', 'guest', 'guestuser.png'),
         _createUser('u101', 'baselB', 'Basel Boulos', 'baseluser.png'),
         _createUser('u102', 'ArtiomB', 'Artiom Bukati', 'artiomuser.png'),
         _createUser('u103', 'NoaN', 'Noa Nissim', 'noauser.png')
      ]
      localStorage.setItem(KEY, JSON.stringify(users))
      return users
   }
}

function _createUser(id, username, fullname, imgUrl = '') {
   const user = {
      _id: id,
      username,
      fullname,
      password: '',
      imgUrl,
      mentions: [
         {
            id: '',
            boardId: '',
            taskId: ''
         }
      ],
      subscribedTo: [],
      starredBoardsIds: []
   }
   return user
}

function getEmptyUser() {
   const user = {
      _id: utilService.makeId(),
      username: '',
      fullname: '',
      password: '',
      imgUrl: '',
      mentions: [
         {
            id: '',
            boardId: '',
            taskId: ''
         }
      ],
      subscribedTo: [],
      starredBoardsIds: []
   }
   return user
}
