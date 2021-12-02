<template>
   <section class="board-app" :style="getBoardBgc" v-if="board">
      <div class="board-wrapper">
         <div class="board-container">
            <board-nav
               :boardMembers="board.members"
               :boardBgc="board.style.bgColor"
            />

            <div class="groups-container-main">
               <draggable
                  draggable=".board-group"
                  class="groups-container"
                  v-model="groupsList"
               >
                  <div
                     class="board-group"
                     v-for="(group, idx) in groupsList"
                     :key="idx"
                  >
                     <group-preview :group="group" :board="board" />
                  </div>
                  <!-- <button class="add-group-btn" @click="addGroup()">
                     Add another group
                  </button> -->
                  <div class="add-group-container">
                     <form class="add-group-form">
                        <button class="add-group-btn" @click="addGroup()">
                           <span>+ </span>
                           <span>Add another group</span>
                        </button>
                        <input
                           type="text"
                           class="new-group-name-input"
                           placeholder="Enter list title"
                           autocomplete="off"
                           dir="auto"
                           maxlength="512"
                        />
                        <div></div>
                     </form>
                  </div>
               </draggable>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
import groupPreview from '@/cmps/group-preview'
import boardNav from '@/cmps/board-nav'
import draggable from 'vuedraggable'

export default {
   name: 'board-app',
   components: {
      groupPreview,
      boardNav,
      draggable
   },
   data() {
      return {
         board: null
      }
   },
   computed: {
      groupsList: {
         get() {
            return this.$store.getters.boardGroups
         },
         set(groups) {
            this.$store.dispatch({ type: 'updateGroups', groups })
         }
      },
      getBoardBgc() {
         return this.$store.getters.getBoardBgc
      }
   },
   methods: {
      addGroup() {
         this.$store.dispatch({ type: 'addGroup' })
      }
   },
   watch: {
      '$route.params.boardId': {
         immediate: true,
         async handler() {
            try {
               let boardId = this.$route.params.boardId
               const currBoard = await this.$store.dispatch({ type: 'getBoardbyId', boardId })
               await this.$store.dispatch({ type: 'loadUsers' })
               this.board = currBoard
            } catch (err) {
               console.log(err)
            }
         }
      }
   }
}
</script>
