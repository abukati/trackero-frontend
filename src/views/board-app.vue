<template>
	<section class="board-app" :style="getBoardBgc" v-if="board">
		<div class="board-wrapper">
			<div class="board-container">
				<board-nav :boardMembers="board.members" />
				<draggable class="groups-container" v-model="groupsList">
					<div class="board-group" v-for="(group, idx) in groupsList" :key="idx">
						{{ group.id }}
						<group-preview :group="group" :board="board" />
					</div>
					<button @click="addGroup()">Add another group</button>
				</draggable>
			</div>
			<label>
				<span>Update bgc</span>
				<input type="color" v-model="board.style.bgColor" @change="changeBoardBgc" />
			</label>
		</div>
	</section>
</template>

<script>
import groupPreview from '@/cmps/group-preview'
import boardNav from '@/cmps/board-nav'
import draggable from 'vuedraggable'

export default {
	name: 'board-app',
	components: {
		groupPreview,
		boardNav,
		draggable
	},
	data() {
		return {
			board: null
		}
	},
	computed: {
		groupsList: {
			get() {
				return this.$store.getters.boardGroups
			},
			set(groups) {
				this.$store.dispatch({ type: 'updateGroups', groups })
			}
		},
		getBoardBgc() {
			return { backgroundColor: this.board.style.bgColor }
		}
	},
	methods: {
		addGroup() {
			this.$store.dispatch({ type: 'addGroup' })
		},
		changeBoardBgc() {
			this.$store.dispatch({ type: 'updateBoard', board: { ...this.board } })
			// this.$emit('boardBgChange', this.board.style.bgColor)
		}
	},
	watch: {
		'$route.params.boardId': {
			immediate: true,
			async handler() {
				try {
					let boardId = this.$route.params.boardId
					const currBoard = await this.$store.dispatch({ type: 'getBoardbyId', boardId })
					await this.$store.dispatch({ type: 'loadUsers' })
					this.board = currBoard
				} catch (err) {
					console.log(err)
				}
			}
		}
	}
}
</script>
