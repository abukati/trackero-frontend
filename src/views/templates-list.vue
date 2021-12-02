<template>
   <section class="workspace-container">
      <ul class="clean-list" v-if="boardsIds">
         <li v-for="boardId in boardsIds" :key="boardId">
            <router-link :to="`board/${boardId}`">Board </router-link>
            <button @click="removeBoard(boardId)">Delete</button>
         </li>
      </ul>
      <aside class="workspace-side-nav">
         <nav class="workspace-left-sidebar-container">
            <div>
               <ul class="clean-list workspace-main-btns">
                  <li>
                     <a href="#"><span>Boards</span></a>
                  </li>
                  <li>
                     <a href="#"><span>Templates</span></a>
                  </li>
                  <li>
                     <a href="#"><span>Home</span></a>
                  </li>
               </ul>
            </div>
         </nav>
      </aside>
      <!-- <form @submit.prevent="addBoard">
			<input type="text" placeholder="Board title" v-model="newBoardTitle" />
			<button>Create board</button>
		</form> -->
   </section>
</template>

<script>
export default {
   name: 'templates-list',
   data() {
      return {
         newBoardTitle: ''
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
      }
   },
   computed: {
      boardsIds() {
         return this.$store.getters.boardsIds
      }
   }
}
</script>
