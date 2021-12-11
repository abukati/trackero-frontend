<template>
   <div class="board-backgrounds-photos">
      <div class="search-photos">
         <input type="text" placeholder="Photos" />
         <span class="icon-sm icon-search"></span>
      </div>
      <div class="board-background-list-observer">
         <div class="board-backgrounds-list">
            <!-- <template v-for="n in 10">
               <div @click="selectBg" class="board-background-select" :key="n">
                  <span class="background-box" style="backgroundImage:url('https://images.unsplash.com/photo-1637952112301-6090dca83ccb?fm=jpg&fit=max')"></span>
               </div>
            </template> -->
            <template v-for="(photo,idx) in photos">
               <div @click="selectBg(photo.urls.regular)" class="board-background-select" :key="idx">
                  <span class="background-box" :style="{'backgroundImage':`url(${photo.urls.regular})`}"></span>
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
   created(){
       this.$store.dispatch({type:'fetchPhotos'})
   },
   methods: {
      selectBg(url) {
         this.$store.dispatch('changeBoardBgc', {bgc:`url('${url}&fit=max')`})
      }

   },
   computed:{
      photos(){
         return this.$store.getters.photos
      }
   }
}
</script>

<style>

</style>