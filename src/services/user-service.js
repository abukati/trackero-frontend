import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'

const KEY = 'usersDB'

export const userService = {
   query,
   getEmptyUser,
}

var gUsers = _createUsers()

async function query() {
   try {
      return await storageService.query(KEY)
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
         _createUser('u103', 'NoaN', 'Noa Nissim', 'noauser.png'),
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
            taskId: '',
         },
      ],
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
            taskId: '',
         },
      ],
   }
   return user
}
