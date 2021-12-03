<template>
   <div class="board-nav">
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
            <input
               type="color"
               :value="getBoardBgc"
               @change="changeBoardBgc($event)"
            />
         </label>
      </div>
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
