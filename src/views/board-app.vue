<template>
   <section
      class="board-app"
      :style="{ backgroundColor: getBoardBgc }"
      v-if="board"
   >
      <div class="board-wrapper" :class="{ 'is-show-menu': isBoardMenuOpen }">
         <div class="task-detail-modal-container">
            <div class="modal-content">
               <router-view :class="{ 'window-up': isModalOpen }" />
            </div>
         </div>
         <task-preview-edit
            @closePreviewEdit="closePreviewEdit"
            v-if="isPreviewEdit"
            :task="this.task"
            :board="board"
            :group="this.group"
            :modalPos="this.modalPos"
            :key="task.id"
         />
         <div class="board-container">
            <div class="board-content">
               <div class="board-content-wrapper">
                  <div class="board-main-content">
                     <board-nav
                        @toggleBoardNavMenu="toggleBoardNavMenu"
                        :board="board"
                        :boardMembers="board.members"
                        :boardBgc="board.style.bgColor"
                     />

                     <div class="groups-container-main">
                        <draggable
                           v-if="onlyOneEdit"
                           class="groups-container"
                           handle=".group-header-section"
                           draggable=".board-group"
                           group="groupsList"
                           v-model="groupsList"
                           filter=".group-header-title-textarea"
                           preventOnFilter="true"
                           delay="1"
                        >
                           <div
                              class="board-group"
                              v-for="(group, idx) in groupsList"
                              :key="idx"
                           >
                              <group-preview
                                 @onlyOneEdit="onlyOneEdit"
                                 @toggleModal="toggleModalClass"
                                 :group="group"
                                 :board="board"
                              />
                           </div>

                           <div class="add-list-section">
                              <div
                                 v-if="!isListInputOpen"
                                 @click="toggleInput"
                                 class="add-list-button"
                              >
                                 <a class="list-composer">
                                    <span class="add-task-plus-icon">
                                       <img src="@/assets/img/plus-icon.svg" />
                                    </span>
                                    <span class="add-task-span"
                                       >Add another list</span
                                    >
                                 </a>
                              </div>

                              <!-- list composer section -->
                              <div v-else class="list-composer-open">
                                 <div class="add-list-title-input-section">
                                    <input
                                       type="text"
                                       class="add-list-title-input"
                                       v-model="newListTitleInput"
                                       placeholder="Enter list title..."
                                    />
                                 </div>
                                 <div class="add-list-control-section">
                                    <button
                                       @click="addGroup"
                                       class="add-list-confirm-btn"
                                    >
                                       Add list
                                    </button>
                                    <span
                                       @click="toggleInput"
                                       class="cancel-add-list"
                                    >
                                       <img
                                          src="@/assets/img/cancel-icon.svg"
                                       />
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </draggable>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <board-nav-side-menu
            :board="board"
            :isBoardMenuOpen="isBoardMenuOpen"
            :onSideMenuOpen="toggleBoardNavMenu"
         />
      </div>
   </section>
</template>

<script>
import groupPreview from '@/cmps/group-preview'
import boardNav from '@/cmps/board-nav'
import boardNavSideMenu from '@/cmps/board-sidemenu'
import draggable from 'vuedraggable'
import taskPreviewEdit from '@/cmps/task-preview-edit.vue'

export default {
   name: 'board-app',
   components: {
      groupPreview,
      boardNav,
      boardNavSideMenu,
      taskPreviewEdit,
      draggable,
   },
   data() {
      return {
         board: null,
         isListInputOpen: false,
         newListTitleInput: '',
         isModalOpen: false,
         isBoardMenuOpen: false,
         isPreviewEdit: false,
         task: null,
         group: null,
         modalPos: {},
      }
   },
   created() {
      window.addEventListener('storage', this.loadBoards)
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
         this.isListInputOpen = !this.isListInputOpen
      },
      toggleModalClass(ev) {
         this.isModalOpen = true
      },
      async loadBoards() {
         try {
            let boardId = this.$route.params.boardId
            const currBoard = await this.$store.dispatch({ type: 'getBoardbyId', boardId })
            this.board = currBoard
         } catch (err) {
            console.log(err)
         }
      },
      toggleBoardNavMenu(ev) {
         this.isBoardMenuOpen = !this.isBoardMenuOpen
      },
      onlyOneEdit(group, task, modalPos) {
         this.isPreviewEdit = true
         this.task = task
         this.group = group
         this.modalPos = modalPos
      },
      closePreviewEdit() {
         this.isPreviewEdit = false
      }

   },
   watch: {
      '$route.params.boardId': {
         immediate: true,
         deep: true,
         async handler() {
            try {
               this.loadBoards()
               let taskId = this.$route.params.taskId
               if (taskId) this.isModalOpen = true
            } catch (err) {
               console.log(err)
            }
         }
      }
   }
}
</script>
