<template>
   <section class="board-app" v-if="board">
      <draggable v-model="groupsList" @change="draggedGroup">
         <div class="board-group" v-for="(group, idx) in groupsList" :key="idx">
            {{ group.id }}
            <group-preview :group="group" />
         </div>
      </draggable>
   </section>
</template>

<script>
import groupPreview from "@/cmps/group-preview";
import draggable from "vuedraggable";

export default {
   name: "board-app",
   components: {
      groupPreview,
      draggable,
   },
   data() {
      return {
         board: null,
      };
   },
   computed: {
      groupsList: {
         get() {
            return this.$store.getters.boardGroups;
         },
         set(groups) {
            this.$store.dispatch({ type: "updateSortedGroups", groups });
         },
      },
   },
   methods: {
      draggedGroup(ev) {
         console.log(ev);
      },
   },
   watch: {
      "$route.params.boardId": {
         immediate: true,
         async handler() {
            try {
               let boardId = this.$route.params.boardId;
               const currBoard = await this.$store.dispatch({
                  type: "getBoardbyId",
                  boardId,
               });
               this.board = currBoard;
               this.$store.dispatch({ type: "setCurrBoard", currBoard });
            } catch (err) {
               window.open(`https://stackoverflow.com/search?q=${err.message}`);
            }
         },
      },
   },
};
</script>
