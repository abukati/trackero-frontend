<template>
   <section class="templates-container">
      <h2>Templates-list</h2>
      <form @submit.prevent="addBoard">
         <input type="text" placeholder="Board title" v-model="newBoardTitle" />
         <button>Create board</button>
      </form>
      <ul v-if="boardsIds">
         <li v-for="(boardId, idx) in boardsIds" :key="boardId">
            <router-link :to="`board/${boardId}`">Board - {{ idx }}</router-link>
            <button @click="removeBoard(boardId)">Delete</button>
         </li>
      </ul>
   </section>
</template>

<script>
export default {
   name: 'templates-list',
   data() {
      return {
         newBoardTitle: '',
      }
   },
   created() {
      this.$store.dispatch({ type: 'loadBoards' })
   },
   methods: {
      removeBoard(boardId) {
         this.$store.dispatch({ type: 'removeBoard', boardId })
      },
      addBoard() {
         this.$store.dispatch({ type: 'addBoard', boardTitle: this.newBoardTitle })
      },
   },
   computed: {
      boardsIds() {
         return this.$store.getters.boardsIds
      },
   },
}
</script>
