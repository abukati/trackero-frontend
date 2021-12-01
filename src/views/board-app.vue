<template>
   <section class="board-app" :style="getBoardBgc" v-if="board">
      <!-- <el-select v-if="membersNames" v-model="membersNames" multiple placeholder="Select" @change="handleBoardMembers">
         <el-option v-for="(member, idx) in membersNames" :key="idx" :value="member"> </el-option>
      </el-select> -->
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
      draggable
   },
   data() {
      return {
         board: null,
         membersNames: [],
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
      // boardMembers() {
      //    return this.$store.getters.boardMembers
      // },
   },
   created() {
      // this.membersNames = this.boardMembers.map((member) => member.fullname)
   },
   methods: {
      addGroup() {
         this.$store.dispatch({ type: 'addGroup' })
      },
      changeBoardBgc() {
         this.$store.dispatch({ type: 'updateBoard', board: { ...this.board } })
      },
      handleBoardMembers() {
         console.log('test')
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
