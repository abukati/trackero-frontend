<template>
   <div
      class="pop-over is-shown"
      :style="{
         top: 44 + 'px',
         left: 235 + 'px',
         'background-color': '#ffffff',
      }"
   >
      <div class="no-back">
         <div class="pop-over-header js-pop-over-header">
            <span class="pop-over-header-title">List actions</span>
            <span @click="closeModal" class="pop-over-header-close-btn">
               <!-- <img class="icon-sm" src="@/assets/img/cancel-icon.svg" /> -->
               <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#5e6c84"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-x icon-sm"
               >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
               </svg>
            </span>
         </div>
         <div>
            <div class="pop-over-content" :style="{ 'max-height': 350 + 'px' }">
               <div>
                  <div>
                     <ul class="pop-over-list">
                        <li>
                           <a class="js-add-card" @click="addTask" href="#"
                              >Add card…</a
                           >
                        </li>
                        <li>
                           <a class="js-delete-list" @click="deleteGroup">
                              Archive this list</a
                           >
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: ['group', 'board'],
   name: 'modalListActions',
   data() {
      return {
         isModalOpen: false,
         isOptionsListOpen: false,
         isTaskInputOpen: false,
         taskInput: '',
      }
   },

   methods: {
      closeModal() {
         this.isModalOpen = !this.isModalOpen
         this.$emit('closeModal')
      },
      async addTask() {
         this.$emit('openAddTask')
      },
      async deleteGroup() {
         try {
            const groupId = this.group.id
            const deletedId = this.$store.dispatch({ type: 'removeGroup', groupId })
            this.isOptionsListOpen = false
         } catch (err) {
            console.log(err)
         }
      },
   },
   computed: {

   }
}
</script>

