<template>
   <div class="board-background-section-tiles clearfix">
      <template v-if="!currCmp">
         <div @click="openPhotos" class="board-background-section-tile board-background-photos-tile">
            <div class="image"></div>
            <div class="title">Photos</div>
         </div>
         <div @click="openColors" class="board-background-section-tile board-colors-photos-tile">
            <div class="image"></div>
            <div class="title">Colors</div>
         </div>
      </template>
      <component v-else :is="currCmp" :board="board" />
   </div>
</template>

<script>
import openColors from './sidemenu-colors'
import openPhotos from './sidemenu-photos'

export default {
   name: 'changeBgcCmp',
   props: {
      board: Object, required: true,
   },
   components: {
      openColors,
      openPhotos
   },
   data() {
      return {
         currCmp: null
      }
   },
   methods: {
      openPhotos() {
         this.currCmp = 'openPhotos'
      },
      openColors() {
         this.currCmp = 'openColors'
      },
   }
}
</script>