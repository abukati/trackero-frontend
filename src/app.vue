<template>
   <div id="app">
      <main :style="{ background: pageBgc }">
         <app-header v-if="loggedUser" />
         <router-view v-if="loggedUser" />
         <!-- <loading-overlay v-else /> -->
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
         loggedUser: null
      }
   },
   async created() {
      await this.$store.dispatch({ type: 'loadUsers' })
      this.loggedUser = this.$store.getters.currLoggedUser
   },
   computed: {
      pageBgc() {
         if (!this.$store.getters.currBoard || !this.$route.params.boardId) return '#025AA7'
         else return this.$store.getters.getBoardBgc
      }
   },
}
</script>