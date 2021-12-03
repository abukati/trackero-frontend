<template>
   <section
      class="board-app"
      :style="{ backgroundColor: getBoardBgc }"
      v-if="board"
   >
      <div class="board-wrapper">
         <div class="board-container">
            <board-nav
               :boardMembers="board.members"
               :boardBgc="board.style.bgColor"
            />

            <div class="groups-container-main">
               <draggable
                  :options="{ draggable: '.board-group' }"
                  class="groups-container"
                  group="groups"
                  v-model="groupsList"
               >
                  <div
                     class="board-group"
                     v-for="(group, idx) in groupsList"
                     :key="idx"
                  >
                     <group-preview :group="group" :board="board" />
                  </div>

                  <div class="add-list-section">
                     <div
                        v-if="!isListInputOpen"
                        @click="toggleInput"
                        class="add-list-button"
                     >
                        <a href="#" class="list-composer">
                           <span class="add-task-plus-icon">
                              <img src="@/assets/img/plus-icon.svg" />
                           </span>
                           <span class="add-task-span">Add another list</span>
                        </a>
                     </div>

                     <!-- list composer section -->
                     <div v-else class="list-composer-open">
                        <div class="add-list-title-input-section">
                           <textarea
                              type="text"
                              class="add-list-title-input"
                              v-model="newListTitleInput"
                              placeholder="Enter a title for this card..."
                           />
                        </div>
                        <div class="add-list-control-section">
                           <button
                              @click="addGroup"
                              class="add-list-confirm-btn"
                           >
                              Add list
                           </button>
                           <span @click="toggleInput" class="cancel-add-list">
                              <img src="@/assets/img/cancel-icon.svg" />
                           </span>
                        </div>
                     </div>
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
         board: null,
         isListInputOpen: false,
         newListTitleInput: '',
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
      },

   },
   methods: {
      addGroup() {
         this.$store.dispatch({ type: 'addGroup', title: this.newListTitleInput })
         this.newListTitleInput = ''
         this.isListInputOpen = false
      },
      toggleInput() {
         console.log('this.isListInputOpen', this.isListInputOpen)
         this.isListInputOpen = !this.isListInputOpen
         console.log('this.isListInputOpen', this.isListInputOpen)
      },
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
