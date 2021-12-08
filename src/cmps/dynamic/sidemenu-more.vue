<template>
  <div>
      <ul class="board-menu-navigation">
         <li class="board-menu-navigation-item mod-background">
            <a @click="toggleBoardWatch" class="board-menu-navigation-item-link change-background">
               <span class="board-menu-navigation-item-link-icon fill-background-preview"></span>
               &nbsp;Watch
            </a>
         </li>
      </ul>
      <hr />
      <ul class="board-menu-navigation">
         <li class="board-menu-navigation-item">
            <a @click="leaveBoard" class="board-menu-navigation-item-link open-archive">
               &nbsp;Leave board...
            </a>
         </li>
         <li class="board-menu-navigation-item">
            <a @click="leaveBoard" class="board-menu-navigation-item-link open-more">
               &nbsp;Archive board...
            </a>
         </li>
      </ul>
      <hr />
      <form class="board-link">
         <label for="id-short-url">Link to this board</label>
         <input @click="$event.target.select()" type="text" id="id-short-url" class="short-url" readonly="readonly" :value="boardUrl">
         <p class="quiet">
            <span class="icon-sm icon-organization-visibility" title="All members of the Workspace can see and edit this board"></span>
               All members of the Workspace can see and edit this board
         </p>
      </form>
   </div>
</template>

<script>
export default {
   name: 'sidemenu-more-dynamic',
   props: {
      board: Object, required: true,
   },
   data() {
      return {
         loggedUser: null
      }
   },
   created() {
      this.loggedUser = this.$store.getters.currLoggedUser
   },
   methods: {
      toggleBoardWatch() {
         let userToUpdate = this.loggedUser
         const idx = userToUpdate.subscribedTo.findIndex(board => board === this.board._id)
         idx === -1 ? userToUpdate.subscribedTo.push(this.board._id) : userToUpdate.subscribedTo.splice(idx, 1)
         this.$store.dispatch('saveUser', { user: userToUpdate })
      },
      closeBoard() {

      },
      leaveBoard() {
         this.$store.dispatch('updateUser', {  })
      },
   },
   computed: {
      boardUrl() {
         const { boardId } = this.$route.params
         return `localhost:8080/board/${boardId}`
      }
   }
}
</script>