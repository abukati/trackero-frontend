<template>
	<div class="board-nav">
		<div class="board-views-btn-container">
			<button class="btn-board-views" type="button" title="Board views">
				<span class="board-views-icon-container">
					<span class="board-views-icon">
						<svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z" fill="#fff"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z" fill="#fff"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z" fill="#fff"></path></svg>
					</span>
				</span>
				<span class="board-views-txt">Board</span>
				<span class="board-views-open-icon-container">
					<span class="board-views-open-icon">
						<img src="@/assets/img/arrow-down.svg" alt="Open board views menu">
					</span>
				</span>
			</button>
		</div>
		<div class="board-header-btn board-name inline-rename-board">
			<h1 class="board-header-btn-text">{{ board.title }}</h1>
			<input class="board-name-input" type="text" spellcheck="false" maxlength="512" :value="board.title" style="width:116px" />
		</div>


		
		<ul class="board-members clean-list" v-if="boardMembers.length">
			<li v-for="user in boardMembers" :key="user._id">
				<Avatar :size="28" :username="user.fullname" />
				<!-- <button @click="removeMember(user)">-</button> -->
			</li>
			<a class="board-header-invite-btn" href="#" title="Invite to board">
				<span class="board-header-btn-icon">
					<img src="@/assets/img/invite-icon.svg" />
				</span>
				<span class="invite-btn-text">Invite</span>
			</a>
		</ul>
		<div class="board-header-right">
			<a class="board-header-menu-btn" href="#">
				<span class="board-header-btn-icon">
					<img src="/img/option.bd12098a.png" />
				</span>
				<span class="board-header-menu-btn-text">Show menu</span>
			</a>
			<label>
				<input type="color" :value="getBoardBgc" @change="changeBoardBgc($event)" />
			</label>
		</div>
	</div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
	props: ['boardMembers', 'board'],
	components: {
		Avatar
	},
	computed: {
		getBoardBgc() {
			return this.$store.getters.getBoardBgc
		}
	},
	methods: {
		addMember(user) {
			this.$store.dispatch({ type: 'addMember', user })
		},
		removeMember(user) {
			this.$store.dispatch({ type: 'removeMember', user })
		},
		changeBoardBgc(ev) {
			this.$store.dispatch({ type: 'changeBoardBgc', bgc: ev.target.value })
		}
	}
}
</script>
