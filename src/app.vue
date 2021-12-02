<template>
   <div id="app">
      <main :style="{ backgroundColor: pageBgc }">
         <app-header />
         <router-view />
      </main>
   </div>
</template>

<script>
import appHeader from '@/cmps/app-header.vue'
export default {
   components: {
      appHeader,
   },
   data() {
      return {}
   },
   computed: {
      pageBgc() {
         if (!this.$store.getters.currBoard || !this.$route.params.boardId) return '#025AA7'
         else return this.$store.getters.getBoardBgc
      }
   },

}
</script>