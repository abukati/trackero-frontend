<template>
   <div class="board-backgrounds-photos">
      <div class="search-photos">
         <input type="text" placeholder="Photos" />
         <span class="icon-sm icon-search"></span>
      </div>
      <div class="board-background-list-observer">
         <div class="board-backgrounds-list">
            <template v-for="n in 10">
               <div @click="selectBg" class="board-background-select" :key="n">
                  <span class="background-box" style="backgroundImage:url('https://images.unsplash.com/photo-1637952112301-6090dca83ccb?fm=jpg&fit=max')"></span>
               </div>
            </template>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'openPhotos',
   props: {
      board: Object, required: true,
   },
   methods: {
      selectBg() {
         this.$store.dispatch('changeBoardBgc', {bgc:`url('https://images.unsplash.com/photo-1637952112301-6090dca83ccb?fm=jpg&fit=max')`})
      }
   }
}
</script>

<style>

</style>