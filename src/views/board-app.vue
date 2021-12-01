<template>
   <section class="board-app" :style="getBoardBgc" v-if="board">
      <h3>All web members</h3>
      <ul v-if="getUsers.length">
         <li v-for="user in getUsers" :key="user._id">
            {{ user.fullname }}
            <button @click="addMember(user)">+</button>
         </li>
      </ul>
      <h3>Board members</h3>
      <ul v-if="board.members.length">
         <li v-for="user in board.members" :key="user._id">
            {{ user.fullname }}
            <button @click="removeMember(user)">-</button>
         </li>
      </ul>
      <label>
         <span>Update bgc</span>
         <input type="color" v-model="board.style.bgColor" @change="changeBoardBgc" />
      </label>
      <button @click="addGroup()">Add another group</button>
      <draggable v-model="groupsList">
         <div class="board-group" v-for="(group, idx) in groupsList" :key="idx">
            {{ group.id }}
            <group-preview :group="group" :board="board" />
         </div>
      </draggable>
   </section>
</template>

<script>
import groupPreview from '@/cmps/group-preview'
import draggable from 'vuedraggable'

export default {
   name: 'board-app',
   components: {
      groupPreview,
      draggable,
   },
   data() {
      return {
         board: null,
      }
   },
   computed: {
      groupsList: {
         get() {
            return this.$store.getters.boardGroups
         },
         set(groups) {
            this.$store.dispatch({ type: 'updateGroups', groups })
         },
      },
      getBoardBgc() {
         return { backgroundColor: this.board.style.bgColor }
      },
      getUsers() {
         return this.$store.getters.users
      },
   },
   methods: {
      addGroup() {
         this.$store.dispatch({ type: 'addGroup' })
      },
      changeBoardBgc() {
         this.$store.dispatch({ type: 'updateBoard', board: { ...this.board } })
      },
      addMember(user) {
         this.$store.dispatch({ type: 'addMember', user })
      },
      removeMember(user) {
         this.$store.dispatch({ type: 'removeMember', user })
      },
   },
   watch: {
      '$route.params.boardId': {
         immediate: true,
         async handler() {
            try {
               let boardId = this.$route.params.boardId
               const currBoard = await this.$store.dispatch({ type: 'getBoardbyId', boardId })
               this.board = currBoard
            } catch (err) {
               window.open(`https://stackoverflow.com/search?q=${err.message}`)
            }
         },
      },
   },
}
</script>
