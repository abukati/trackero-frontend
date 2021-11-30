<template>
   <section class="board-app" v-if="board">
      <div class="board-group" v-for="(group, idx) in board.groups" :key="idx">
         <group-preview :group="group" />
      </div>
   </section>
</template>

<script>
import groupPreview from '@/cmps/group-preview'
export default {
   name: 'board-app',
   components: {
      groupPreview,
   },
   data() {
      return {
         board: null,
      }
   },
   watch: {
      '$route.params.boardId': {
         immediate: true,
         async handler() {
            try {
               let boardId = this.$route.params.boardId
               this.board = await this.$store.dispatch({ type: 'getBoardbyId', boardId })
            } catch (err) {
               console.log(err)
            }
         },
      },
   },
}
</script>
