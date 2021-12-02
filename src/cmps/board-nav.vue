<template>
	<div class="board-nav">
		<ul class="board-members clean-list" v-if="boardMembers.length">
			<li v-for="user in boardMembers" :key="user._id">
				<Avatar :size="28" :username="user.fullname" />
				<!-- <button @click="removeMember(user)">-</button> -->
			</li>
		</ul>
		<a class="board-header-invite-btn" href="#" title="Invite to board">
			<span class="board-header-btn-icon">
				<img src="@/assets/img/invite-icon.svg" />
			</span>
			<span class="invite-btn-text">Invite</span>
		</a>
		<!-- <ul class="clean-list" v-if="getUsers.length">
			<li v-for="user in getUsers" :key="user._id">
				{{ user.fullname }}
				<button @click="addMember(user)">+</button>
			</li>
		</ul> -->
	</div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
	props: ['boardMembers'],
	components: {
		Avatar
	},
	computed: {
		getUsers() {
			return this.$store.getters.users
		}
	},
	methods: {
		addMember(user) {
			this.$store.dispatch({ type: 'addMember', user })
		},
		removeMember(user) {
			this.$store.dispatch({ type: 'removeMember', user })
		}
	}
}
</script>
