<template>
   <section class="templates-container">
      <h2>Templates-list</h2>
      <ul v-if="boardsIds">
         <li v-for="(boardId, idx) in boardsIds" :key="boardId">
            <router-link :to="`board/${boardId}`">Board - {{ idx }}</router-link>
         </li>
      </ul>
   </section>
</template>

<script>
export default {
   name: 'templates-list',
   data() {
      return {}
   },
   created() {
      this.$store.dispatch({ type: 'loadBoards' })
   },
   methods: {},
   computed: {
      boardsIds() {
         return this.$store.getters.boardsIds
      },
   },
}
</script>
