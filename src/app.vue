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
         pageBackground: '#025AA7',
      }
   },
   watch: {
      '$route.params.boardId': {
         immediate: true,
         deep: true,
         async handler() {
            try {
               let boardId = this.$route.params.boardId
               if (!boardId) return (this.pageBackground = '#026AA7')
               const currBoard = await this.$store.dispatch({ type: 'getBoardbyId', boardId })
               this.pageBackground = currBoard.style.bgColor
            } catch (err) {
               console.log(err)
            }
         },
      },
   },
}
</script>
