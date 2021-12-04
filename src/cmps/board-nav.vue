<template>
	<div class="board-nav clearfix">
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
			<input class="board-name-input" type="text" spellcheck="false" maxlength="512" :value="board.title" />
		</div>
		<a href="#" class="board-header-btn board-header-star-container" title="Click to star or unstar this board. Starred board show up at the top of your boards list">
			<span class="star-icon board-header-btn-icon"></span>
		</a>
		<div class="board-header-btn-org-wrapper">
			<span class="board-header-btn-divider"></span>
			<!-- LINK TO USER'S WORKSPACE -->
			<a href="#" class="board-header-btn board-header-btn-org-name open-org-menu">
				<span class="board-header-btn-text">{{board.createdBy.username}}'s Workspace</span>
			</a> 
			<span class="board-header-btn-divider"></span>
			<div class="board-header-btns mod-left"></div>
			<a href="#" id="permission-level" class="board-header-btn perms-btn change-vis" title="All members of the Workspace can see and edit this board">
				<span class="board-header-btn-icon icon-sm icon-organization-visible"></span>
				<span class="board-header-btn-text">Workspace visible</span>
			</a>
		</div>
		<span class="board-header-btn-divider"></span>
		<div class="board-header-btns mod-left">
			<draggable class="board-header-facepile board-member-list" 
				v-model="memberList" group="memberList" draggable=".member-draggable">
				<template v-for="(member, idx) in memberList">
					<a class="member member-draggable" :style="{ 'z-index': memberList.length-idx }" href="#" :key="member._id">
						<avatar :size="28" :username="member.fullname" :title="`${member.fullname}(${member.username})`" />
						<span v-show="member.isAdmin" class="member-type admin" :style="{ 'z-index': memberList.length-idx }"></span>
					</a>
				</template>
			</draggable>
			<a href="#" class="board-header-btn-invite manage-board-members" title="Invite to board">
				<span class="icon-sm icon-add-member board-header-btn-icon"></span>
				<span class="board-header-btn-text">Invite</span>
			</a>
		</div>
		<div class="board-header-btns mod-right">
			<span class="board-header-special-btn-container">
				<button type="button" class="board-header-btn board-header-special-btn board-header-subscribed">
					<span class="icon-sm icon-subscribed board-header-btn-icon"></span>
					<span class="board-header-btn-text">Watching</span>
				</button>
			</span>
			<span class="board-header-btn-divider"></span>
			<span class="board-header-special-btn-container">
				<div class="board-header-filter-btn">
					<button type="button" class="board-header-btn header-filter-btn board-header-special-btn">
						<span class="board-header-filter-btn-icon-container">
							<span class="icon-sm icon-filter board-header-btn-icon"></span>
						</span>
						Filter
					</button>
				</div>
			</span>
			<a href="#" class="board-header-btn mod-show-menu show-sidebar">
				<span class="icon-sm icon-overflow-menu board-header-btn-icon"></span>
				<span class="board-header-btn-text">Show menu</span>
			</a>
		</div>
	</div>
</template>

<script>
import Avatar from 'vue-avatar'
import draggable from 'vuedraggable'

export default {
	props: ['boardMembers', 'board'],
	components: {
		Avatar,
		draggable
	},
	computed: {
		memberList: {
			get() {
				return this.board.members
			},
			set(memberList) {
				console.log(memberList);
			}
		},
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
