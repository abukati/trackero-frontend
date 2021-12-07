<template>
   <section class="workspace-container-wrapper">
      <div class="workspace-container">
         <div class="boards-wrapper">
            <div class="starred-boards">
               <div class="preview-title" v-if="boardsIds">
                  <h3>
                     <span class="icon-lg icon-star board-star-btn-icon"></span>
                     STARRED WORKSPACES
                  </h3>
               </div>
               <div class="board-list" v-if="starredBoardIds.length">
                  <router-link
                     v-for="(boardId, idx) in starredBoardIds"
                     :key="idx"
                     class="board-link"
                     :to="`board/${boardId}`"
                  >
                     <div
                        class="board-preview"
                        :style="{ backgroundColor: getRandomColor }"
                     >
                        <div class="board-preview-details">
                           <!-- <h3>{{ currBoardStarName[idx] }}</h3> -->
                           <h3>{{ boardId }}</h3>
                           <span
                              :data-address="JSON.stringify(boardId)"
                              @click.prevent="toggleIsStarred(boardId)"
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
               <div class="preview-title" v-if="boardsIds">
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
                     v-for="(boardId, idx) in boardsIds"
                     :key="idx"
                     class="board-link"
                     :to="`board/${boardId}`"
                  >
                     <div
                        class="board-preview"
                        :style="{ backgroundColor: getRandomColor }"
                     >
                        <div class="board-preview-details">
                           <h3>{{ currBoardName[idx] }}</h3>
                           <span
                              :data-address="JSON.stringify(boardId)"
                              class="icon-lg icon-star board-star-btn-icon"
                              @click.prevent="toggleIsStarred($event)"
                           ></span>
                        </div>
                     </div>
                  </router-link>
                  <!-- <button @click="removeBoard(boardId)">Delete</button> -->
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
      <!-- <form @submit.prevent="addBoard">
			<input type="text" placeholder="Board title" v-model="newBoardTitle" />
			<button>Create board</button>
		</form> -->
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
         currBoard: null
      }
   },
   created() {
      this.boards = this.$store.dispatch({ type: 'loadBoards' })
   },
   methods: {
      removeBoard(boardId) {
         this.$store.dispatch({ type: 'removeBoard', boardId })
      },
      addBoard() {
         this.$store.dispatch({ type: 'addBoard', boardTitle: this.newBoardTitle })
      },
      async toggleIsStarred(ev) {
         try {
            this.currBoardId = JSON.parse(ev.target.dataset.address)
            console.log('selectedItem', this.currBoardId)
            this.currBoard = await this.$store.dispatch({ type: 'getBoardbyId', boardId: this.currBoardId })
            this.currBoard.isStarred = !this.currBoard.isStarred
            await this.$store.dispatch({ type: 'updateBoard', board: this.currBoard })
            // this.boards = this.$store.dispatch({ type: 'loadBoards' })
         } catch (err) {
            console.log(err)
         }

      }
   },
   computed: {
      boardsIds() {
         return this.$store.getters.boardsIds
      },
      starredBoardIds() {
         return this.$store.getters.starredBoardIds
      },
      getRandomColor() {
         var letters = 'BCDEF'.split('')
         var color = '#'
         for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)]
         }
         return color
      },
      currBoardName() {
         return this.$store.getters.boardsTitles
      },
      currBoardStarName() {
         return this.$store.getters.starBoardsTitles
      }
   }
}
</script>
