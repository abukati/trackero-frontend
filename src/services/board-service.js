import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'

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
	//GROUP
	addGroup,
	removeGroup,
	saveGroups,
	getEmptyGroup,
	//TASK
	createTask,
	updateTasks,
	saveTask,
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

function deep(board) {
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
		createdBy: {
			_id: user._id,
			username: user.username,
			fullname: user.fullname,
			imgUrl: user.imgUrl
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
		boards = [
			_createBoard('Software development'),
			_createBoard('Project management'),
			_createBoard('Business board')
		]
		localStorage.setItem(KEY, JSON.stringify(boards))
	}
	return boards
}

//----------------------------------------------------------- */
//***********************GROUPS********************************
//----------------------------------------------------------- */
async function _getCurrGroup(groupId, board) {
	try {
		// const currBoard = await getCurrBoard()
		const currBoard = deep(board)
		const currGroup = currBoard.groups.find(group => group.id === groupId)
		return currGroup
	} catch (err) {
		console.log(err)
	}
}

async function addGroup(group, board) {
	try {
		// const currBoard = await getCurrBoard()
		const currBoard = deep(board)
		currBoard.groups.push(group)
		saveGroups(currBoard.groups, currBoard)
		return currBoard.groups
	} catch (err) {
		console.log(err)
	}
}

async function _updateGroup(updatedGroup, groupId, board) {
	try {
		// const currBoard = await getCurrBoard()
		const currBoard = deep(board)
		currBoard.groups.forEach(group => {
			if (group.id === groupId) group = updatedGroup
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
		const currBoard = deep(board)
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
		const deepBoard = deep(board)
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
		dueDate: {
			date: '14 Dec 2021',
			isComplete: false
		},
		comments: []
	}
}

//----------------------------------------------------------- */
//***********************MEMBERS********************************
//----------------------------------------------------------- */

async function addMember(user, board) {
	try {
		// const board = await getCurrBoard()
		const deepBoard = deep(board)
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
		const deepBoard = deep(board)
		const idx = deepBoard.members.findIndex(member => member._id === user._id)
		deepBoard.members.splice(idx, 1)
		save(deepBoard)
	} catch (err) {
		console.log(err)
	}
}

function _createBoard(title, user = { _id: 'u100', username: 'guest', fullname: 'guest', imgUrl: '' }) {
	return {
		_id: utilService.makeId(),
		title,
		createdAt: Date.now(),
		createdBy: {
			_id: user._id,
			username: user.username,
			fullname: user.fullname,
			imgUrl: user.imgUrl
		},
		style: {
			bgColor: '#29cce5',
			bgImg: ''
		},
		labels: [
			{
				id: 'l101',
				title: 'Done',
				color: 'green'
			},
			{
				id: 'l102',
				title: '',
				color: 'yellow'
			},
			{
				id: 'l103',
				title: 'Flexible',
				color: 'orange'
			},
			{
				id: 'l104',
				title: 'Important',
				color: 'red'
			},
			{
				id: 'l105',
				title: '',
				color: 'purple'
			},
			{
				id: 'l106',
				title: 'Optional',
				color: 'blue'
			}
		],
		members: [
			{
				_id: 'u101',
				username: 'BaselB',
				fullname: 'Basel Boulos',
				imgUrl: ''
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
				title: 'Develop trackero',
				tasks: [
					{
						id: 't101',
						title: 'Project trackero task',
						style: {
							bgColor: '#000'
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
								imgUrl: ''
							}
						],
						labels: [
							{
								id: 'l102',
								title: '',
								color: 'yellow'
							},
							{
								id: 'l103',
								title: 'Flexible',
								color: 'orange'
							}
						],
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
						title: 'Project trackero task 102',
						style: {
							bgColor: '#000'
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
								imgUrl: ''
							}
						],
						labels: [
							{
								id: 'l102',
								title: '',
								color: 'yellow'
							},
							{
								id: 'l103',
								title: 'Flexible',
								color: 'orange'
							}
						],
						byUser: {
							_id: 'u100',
							fullname: 'Guest',
							username: 'guest',
							imgUrl: ''
						},
						dueDate: {
							date: '15 Dec 2021',
							isComplete: false
						},
						comments: [
							{
								txt: 'Please work on trackero task',
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
				title: 'Develop trackero',
				tasks: [
					{
						id: 't103',
						title: 'Project trackero task',
						style: {
							bgColor: '#000'
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
								imgUrl: ''
							}
						],
						labels: [
							{
								id: 'l102',
								title: '',
								color: 'yellow'
							},
							{
								id: 'l103',
								title: 'Flexible',
								color: 'orange'
							}
						],
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
						id: 't104',
						title: 'Project trackero task 104',
						style: {
							bgColor: '#000'
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
								imgUrl: ''
							}
						],
						labels: [
							{
								id: 'l102',
								title: '',
								color: 'yellow'
							},
							{
								id: 'l103',
								title: 'Flexible',
								color: 'orange'
							}
						],
						byUser: {
							_id: 'u100',
							fullname: 'Guest',
							username: 'guest',
							imgUrl: ''
						},
						dueDate: {
							date: '15 Dec 2021',
							isComplete: false
						},
						comments: [
							{
								txt: 'Please work on trackero task',
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
					imgUrl: ''
				},
				task: {
					id: 't100',
					title: 'Finalize Campaign Name: WeTaskBigger',
					style: {
						bgColor: '#000'
					},
					labels: [],
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
