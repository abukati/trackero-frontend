<template>
   <section class="board-app" v-if="board">
      <button @click="addGroup()">Add another group</button>
      <draggable v-model="groupsList" @change="draggedGroup">
         <div class="board-group" v-for="(group, idx) in groupsList" :key="idx">
            {{ group.id }}
            <group-preview :group="group" />
         </div>
      </draggable>
   </section>
</template>

<script>
import groupPreview from "@/cmps/group-preview"
import draggable from "vuedraggable"

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
            this.$store.dispatch({ type: "updateGroups", groups })
         },
      },
   },
   methods: {
      draggedGroup(ev) {
         console.log(ev)
      },
      addGroup() {
         this.$store.dispatch({ type: 'addGroup' })
      },
   },
   watch: {
      '$route.params.boardId': {
         immediate: true,
         async handler() {
            try {
               let boardId = this.$route.params.boardId
               const currBoard = await this.$store.dispatch({
                  type: 'getBoardbyId',
                  boardId,
               })
               this.board = currBoard
            } catch (err) {
               window.open(`https://stackoverflow.com/search?q=${err.message}`)
            }
         }
      }
   }
}
</script>