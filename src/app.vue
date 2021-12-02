<template>
   <div id="app">
      <main :style="{ backgroundColor: pageBackground }">
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
      return {
         pageBackground: '#026AA7',
      }
   },
   computed: {
      pageBgc() {
         this.pageBackground = this.$store.getters.getBoardBgc || '#026AA7'
      }
   }
}
</script>