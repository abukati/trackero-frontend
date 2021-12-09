<template>
   <div id="app">
       <!-- :style="{ background: pageBgc }" -->
      <main>
         <app-header v-if="loggedUser" />
         <router-view v-if="loggedUser" />
         <!-- <loading-overlay v-else /> -->
         <!-- {{ loggedUser }} -->
      </main>
   </div>
</template>

<script>
import appHeader from '@/cmps/app-header'
// import loadingOverlay from '@/cmps/loading-overlay'

export default {
   components: {
      appHeader,
      // loadingOverlay
   },
   data() {
      return {
         // loggedUser: null
         isHomePage: true
      }
   },
   async created() {
      await this.$store.dispatch({ type: 'loadBoards' })
      await this.$store.dispatch({ type: 'loadUsers' })
      // this.loggedUser = this.$store.getters.currLoggedUser
   },

   computed: {
      pageBgc() {
         console.log(this.$store.getters.currBoard);
         // if (this.isHomePage) return '#eae6ff'
         // if (!this.$store.getters.currBoard || !this.$route.params.boardId) return '#025AA7'
         // else return this.$store.getters.getBoardBgc
      },
      loggedUser() {
         return this.$store.getters.currLoggedUser
      }
   },
}
</script>