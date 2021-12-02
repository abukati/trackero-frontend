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

// function getClonedBoard(
// 	title,
// 	user = {
// 		_id: 'u101',
// 		username: 'BaselB',
// 		fullname: 'Basel Boulos',
// 		imgUrl: ''
// 	}
// ) {
// 	return {
// 		// _id: utilService.makeId(),
// 		title,
// 		createdAt: Date.now(),
// 		createdBy: {
// 			_id: user._id,
// 			username: user.username,
// 			fullname: user.fullname,
// 			imgUrl: user.imgUrl
// 		},
// 		style: {
// 			bgColor: '#29cce5',
// 			bgImg: ''
// 		},
// 		labels: [
// 			{
// 				id: 'l101',
// 				title: 'Done',
// 				color: 'green'
// 			},
// 			{
// 				id: 'l102',
// 				title: '',
// 				color: 'yellow'
// 			},
// 			{
// 				id: 'l103',
// 				title: 'Flexible',
// 				color: 'orange'
// 			},
// 			{
// 				id: 'l104',
// 				title: 'Important',
// 				color: 'red'
// 			},
// 			{
// 				id: 'l105',
// 				title: '',
// 				color: 'purple'
// 			},
// 			{
// 				id: 'l106',
// 				title: 'Optional',
// 				color: 'blue'
// 			}
// 		],
// 		members: [
// 			{
// 				_id: 'u101',
// 				username: 'BaselB',
// 				fullname: 'Basel Boulos',
// 				imgUrl: ''
// 			},
// 			{
// 				_id: 'u102',
// 				username: 'ArtiomB',
// 				fullname: 'Artiom Bukati',
// 				imgUrl: ''
// 			},
// 			{
// 				_id: 'u103',
// 				username: 'NoaN',
// 				fullname: 'Noa Nissim',
// 				imgUrl: ''
// 			}
// 		],
// 		groups: [
// 			{
// 				id: 'g101',
// 				title: 'Develop trackero',
// 				tasks: [
// 					{
// 						id: 't101',
// 						title: 'Project trackero task',
// 						style: {
// 							bgColor: '#000'
// 						},
// 						members: [
// 							{
// 								_id: 'u103',
// 								username: 'NoaN',
// 								fullname: 'Noa Nissim',
// 								imgUrl: ''
// 							},
// 							{
// 								_id: 'u101',
// 								username: 'BaselB',
// 								fullname: 'Basel Boulos',
// 								imgUrl: ''
// 							}
// 						],
// 						labels: [
// 							{
// 								id: 'l102',
// 								title: '',
// 								color: 'yellow'
// 							},
// 							{
// 								id: 'l103',
// 								title: 'Flexible',
// 								color: 'orange'
// 							}
// 						],
// 						byUser: {
// 							_id: 'u100',
// 							fullname: 'Guest',
// 							username: 'guest',
// 							imgUrl: ''
// 						},
// 						dueDate: {
// 							date: '14 Dec 2021',
// 							isComplete: false
// 						},
// 						comments: [
// 							{
// 								txt: 'Please work on trackero',
// 								id: 'c100',
// 								createdAt: Date.now(),
// 								byMember: {
// 									fullname: 'Matan Crispel',
// 									_id: 'u104'
// 								}
// 							}
// 						]
// 					},
// 					{
// 						id: 't102',
// 						title: 'Project trackero task 102',
// 						style: {
// 							bgColor: '#000'
// 						},
// 						members: [
// 							{
// 								_id: 'u103',
// 								username: 'NoaN',
// 								fullname: 'Noa Nissim',
// 								imgUrl: ''
// 							},
// 							{
// 								_id: 'u101',
// 								username: 'BaselB',
// 								fullname: 'Basel Boulos',
// 								imgUrl: ''
// 							}
// 						],
// 						labels: [
// 							{
// 								id: 'l102',
// 								title: '',
// 								color: 'yellow'
// 							},
// 							{
// 								id: 'l103',
// 								title: 'Flexible',
// 								color: 'orange'
// 							}
// 						],
// 						byUser: {
// 							_id: 'u100',
// 							fullname: 'Guest',
// 							username: 'guest',
// 							imgUrl: ''
// 						},
// 						dueDate: {
// 							date: '15 Dec 2021',
// 							isComplete: false
// 						},
// 						comments: [
// 							{
// 								txt: 'Please work on trackero task',
// 								id: 'c101',
// 								createdAt: Date.now(),
// 								byMember: {
// 									fullname: 'Matan Crispel',
// 									_id: 'u104'
// 								}
// 							}
// 						]
// 					}
// 				],
// 				style: {
// 					bgColor: '#ebecf0'
// 				}
// 			},
// 			{
// 				id: 'g102',
// 				title: 'Develop trackero',
// 				tasks: [
// 					{
// 						id: 't102',
// 						title: 'Project trackero task',
// 						style: {
// 							bgColor: '#000'
// 						},
// 						members: [
// 							{
// 								_id: 'u103',
// 								username: 'NoaN',
// 								fullname: 'Noa Nissim',
// 								imgUrl: ''
// 							},
// 							{
// 								_id: 'u101',
// 								username: 'BaselB',
// 								fullname: 'Basel Boulos',
// 								imgUrl: ''
// 							}
// 						],
// 						labels: [
// 							{
// 								id: 'l102',
// 								title: '',
// 								color: 'yellow'
// 							},
// 							{
// 								id: 'l103',
// 								title: 'Flexible',
// 								color: 'orange'
// 							}
// 						],
// 						byUser: {
// 							_id: 'u100',
// 							fullname: 'Guest',
// 							username: 'guest',
// 							imgUrl: ''
// 						},
// 						dueDate: {
// 							date: '14 Dec 2021',
// 							isComplete: false
// 						},
// 						comments: [
// 							{
// 								txt: 'Please work on trackero',
// 								id: 'c100',
// 								createdAt: Date.now(),
// 								byMember: {
// 									fullname: 'Matan Crispel',
// 									_id: 'u104'
// 								}
// 							}
// 						]
// 					},
// 					{
// 						id: 't103',
// 						title: 'Project trackero task 103',
// 						style: {
// 							bgColor: '#000'
// 						},
// 						members: [
// 							{
// 								_id: 'u103',
// 								username: 'NoaN',
// 								fullname: 'Noa Nissim',
// 								imgUrl: ''
// 							},
// 							{
// 								_id: 'u101',
// 								username: 'BaselB',
// 								fullname: 'Basel Boulos',
// 								imgUrl: ''
// 							}
// 						],
// 						labels: [
// 							{
// 								id: 'l102',
// 								title: '',
// 								color: 'yellow'
// 							},
// 							{
// 								id: 'l103',
// 								title: 'Flexible',
// 								color: 'orange'
// 							}
// 						],
// 						byUser: {
// 							_id: 'u100',
// 							fullname: 'Guest',
// 							username: 'guest',
// 							imgUrl: ''
// 						},
// 						dueDate: {
// 							date: '15 Dec 2021',
// 							isComplete: false
// 						},
// 						comments: [
// 							{
// 								txt: 'Please work on trackero task',
// 								id: 'c101',
// 								createdAt: Date.now(),
// 								byMember: {
// 									fullname: 'Matan Crispel',
// 									_id: 'u104'
// 								}
// 							}
// 						]
// 					}
// 				],
// 				style: {
// 					bgColor: '#ebecf0'
// 				}
// 			}
// 		],
// 		activities: [
// 			{
// 				txt: 'Added task "Finalize Campaign Name: WeTaskBigger" to list: Done',
// 				createdAt: Date.now(),
// 				byMember: {
// 					_id: 'u100',
// 					fullname: 'Guest',
// 					username: 'guest',
// 					imgUrl: ''
// 				},
// 				task: {
// 					id: 't100',
// 					title: 'Finalize Campaign Name: WeTaskBigger',
// 					style: {
// 						bgColor: '#000'
// 					},
// 					labels: [],
// 					members: [
// 						{
// 							_id: 'u102',
// 							username: 'ArtiomB',
// 							fullname: 'Artiom Bukati',
// 							imgUrl: ''
// 						}
// 					]
// 				},
// 				id: 'a100'
// 			}
// 		]
// 	}
// }

// function getClonedGroup() {
// 	const group = {
// 		id: utilService.makeId(),
// 		title: 'Develop trackero Cloned',
// 		tasks: [
// 			{
// 				id: utilService.makeId(),
// 				title: 'Project trackero task',
// 				style: {
// 					bgColor: '#000'
// 				},
// 				members: [],
// 				labels: [],
// 				byUser: {
// 					_id: 'u100',
// 					fullname: 'Guest',
// 					username: 'guest',
// 					imgUrl: ''
// 				},
// 				dueDate: {
// 					date: '14 Dec 2021',
// 					isComplete: false
// 				},
// 				comments: [{}]
// 			}
// 		],
// 		style: {
// 			bgColor: '#ebecf0'
// 		}
// 	}
// 	return group
// }
