<template>
   <section class="workspace-container-wrapper">
      <div class="workspace-container">
         <div class="boards-wrapper" v-if="boards && starred">
            <div class="starred-boards">
               <div class="preview-title" v-if="boards">
                  <h3>
                     <span class="icon-lg icon-star board-star-btn-icon"></span>
                     STARRED WORKSPACES
                  </h3>
               </div>
               <div class="board-list" v-if="starred.length">
                  <router-link
                     v-for="(board, idx) in starred"
                     :key="idx"
                     class="board-link"
                     :to="`board/${board._id}`"
                  >
                     <div
                        class="board-preview"
                        :style="{
                           backgroundImage:
                              'url(' +
                              require(`@/assets/img/backgrounds/bgImg${
                                 idx + 1
                              }.jpg`) +
                              ')',
                        }"
                     >
                        <div class="board-preview-details">
                           <h3>{{ board.title }}</h3>
                           <!-- <h3>{{ board._id }}</h3> -->
                           <span
                              @click.prevent="toggleIsStarred(board)"
                              class="
                                 icon-lg icon-star
                                 board-star-btn-icon
                                 is-on
                              "
                           ></span>
                        </div>
                     </div>
                  </router-link>
                  <!-- <button @click="removeBoard(boardId)">Delete</button> -->
               </div>
            </div>
            <div class="workspaces-boards">
               <div class="preview-title" v-if="boards">
                  <h3>
                     <span
                        class="
                           board-menu-navigation-item-link-icon
                           icon-lg icon-board
                        "
                     ></span>
                     YOUR WORKSPACES
                  </h3>
               </div>
               <div class="board-list">
                  <router-link
                     v-for="(board, idx) in boards"
                     :key="idx"
                     class="board-link"
                     :to="`/board/${board._id}`"
                  >
                     <div
                        class="board-preview"
                        :style="{
                           backgroundImage:
                              'url(' +
                              require(`@/assets/img/backgrounds/bgImg${
                                 idx + 1
                              }.jpg`) +
                              ')',
                        }"
                     >
                        <div class="board-preview-details">
                           <h3>{{ board.title }}</h3>
                           <!-- <h3>{{ board._id }}</h3> -->
                           <span
                              class="icon-lg icon-star board-star-btn-icon"
                              @click.prevent="toggleIsStarred(board)"
                           ></span>
                        </div>
                     </div>
                     <!-- <button @click.prevent="removeBoard(board._id)">
                        Delete
                     </button> -->
                  </router-link>
                  <form class="add-board-section" @submit.prevent="addBoard">
                     <div
                        @click="toggleInput"
                        v-if="!isInputOpen"
                        class="add-board-input-closed"
                     >
                        <h2>create new board</h2>
                     </div>
                     <div v-if="isInputOpen" class="add-board-form-section">
                        <div class="add-board-input-section">
                           <input
                              class="add-board-input"
                              type="text"
                              placeholder="Board title"
                              v-model="newBoardTitle"
                           />
                        </div>
                        <div class="add-board-control-section">
                           <button class="add-board-confirm-btn">
                              Add Board
                           </button>
                           <span
                              @click="toggleInput"
                              class="icon-lg icon-close"
                           ></span>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
      <!-- <aside class="workspace-side-nav">
         <nav class="workspace-left-sidebar-container">
            <div>
               <ul class="clean-list workspace-main-btns">
                  <li>
                     <a href="#"><span>Boards</span></a>
                  </li>
                  <li>
                     <a href="#"><span>Templates</span></a>
                  </li>
                  <li>
                     <a href="#"><span>Home</span></a>
                  </li>
               </ul>
            </div>
         </nav>
      </aside> -->
   </section>
</template>

<script>
export default {
   name: 'templates-list',
   data() {
      return {
         newBoardTitle: '',
         boards: null,
         currBoardId: null,
         currBoard: null,
         starred: null,
         isInputOpen: false
      }
   },
   async created() {
      try {
         await this.$store.dispatch({ type: 'loadBoards' })
         this.boards = this.$store.getters.allBoards
         this.starred = this.$store.getters.starredBoards
      } catch (err) {
         console.log(err)
      }
   },
   methods: {
      async removeBoard(boardId) {
         try {
            this.$store.dispatch({ type: 'removeBoard', boardId })
            await this.$store.dispatch({ type: 'loadBoards' })
            this.boards = this.$store.getters.allBoards
         } catch (err) {
            console.log(err)
         }
      },
      async addBoard() {
         try {
            this.$store.dispatch({ type: 'addBoard', boardTitle: this.newBoardTitle })
            await this.$store.dispatch({ type: 'loadBoards' })
            this.boards = this.$store.getters.allBoards
            this.newBoardTitle = ''
            this.toggleInput()
         } catch (err) {
            console.log(err)
         }
      },
      async toggleIsStarred(board) {
         try {

            // this.currBoardId = JSON.parse(ev.target.dataset.address)
            // console.log('selectedItem', this.currBoardId)
            this.currBoard = await this.$store.dispatch({ type: 'getBoardbyId', boardId: board._id })
            this.currBoard.isStarred = !this.currBoard.isStarred
            await this.$store.dispatch({ type: 'updateBoard', board: this.currBoard })
            await this.$store.dispatch({ type: 'loadBoards' })
            this.boards = this.$store.getters.allBoards
            this.starred = this.$store.getters.starredBoards
         } catch (err) {
            console.log(err)
         }
      },
      async toggleInput() {
         try {
            this.isInputOpen = !this.isInputOpen
         } catch (err) {
            console.log(err)
         }
      }
   },
   computed: {
      // boardsAll() {
      //    console.log('this.$store.getters.boardsForDisplay', this.$store.getters.boardsForDisplay)
      //    return this.$store.getters.boardsForDisplay
      // },
      async starredBoards() {
         try {
            const starred = await this.$store.getters.starredBoards
            return starred
         } catch (err) {
            console.log(err)
         }
      },
      async allBoards() {
         try {
            const all = await this.$store.getters.allBoards
            return all
         } catch (err) {
            console.log(err)
         }
      },
      getRandomColor() {
         var letters = 'BCDEF'.split('')
         var color = '#'
         for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)]
         }
         return color
      },

   }
}
</script>
