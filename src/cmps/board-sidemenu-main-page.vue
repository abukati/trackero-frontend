<template>
   <component @changeCmp="setCurrCmp" :is="currCmp" :board="board" :moreOptions="moreOptions"></component>
</template>

<script>
import sidemenuMainDynamic from './dynamic/sidemenu-main'
import aboutBoardCmp from './dynamic/sidemenu-about'
import changeBgcCmp from './dynamic/sidemenu-boardbg'
import labelsList from './dynamic/labels-list'
import archiveCmp from './dynamic/sidemenu-archived'

export default {
   name: 'menu-main-page',
   props: {
      board: Object, required: true,
      moreOptions: Function, required: true,
   },
   components: {
      sidemenuMainDynamic,
      aboutBoardCmp,
      changeBgcCmp,
      labelsList,
      archiveCmp
   },
   data() {
      return {
         currCmp: 'sidemenu-main-dynamic'
      }
   },
   methods: {
      setCurrCmp(cmp) {
         this.currCmp = cmp
      }
   }
}
</script>