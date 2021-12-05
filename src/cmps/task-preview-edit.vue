<template>
   <div v-if="task" class="quick-card-editor">
      <span class="icon-lg icon-close quick-card-editor-close-icon">
         <img src="@/assets/img/close-icon.svg" />
      </span>
      <div
         class="quick-card-editor-card"
         style="top: 368px; left: 72px; width: 256px"
      >
         <div
            class="list-card list-card-quick-edit js-stop"
            style="width: 256px"
         >
            <div
               v-if="isCoverBgc"
               class="list-card-cover"
               :style="{
                  backgroundColor: task.style.bgColor,
                  height: isHeight + 'px',
               }"
            ></div>
            <div class="list-card-details">
               <div
                  v-if="task.labels && task.labels.length"
                  class="list-card-labels"
               >
                  <span
                     v-for="label in task.labels"
                     :key="label.id"
                     class="card-label"
                     :style="{
                        backgroundColor: label.color,
                        height: labelsHeight + 'px',
                     }"
                  >
                     <span class="label-text">{{ label.title }}</span>
                  </span>
               </div>

               <textarea
                  class="list-card-edit-title"
                  :value="task.title"
               ></textarea>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'task-edit',
   components: {
   },
   data() {
      return {
         task: null,
         groupTitle: '',
         taskId: 't101',
         currLoggedUser: null,
         boardId: '',
         groupId: '',
         isTitleInputOpen: false,
         taskInput: '',
         taskToEdit: null,
         isEditable: false

      }
   },
   created() {
      this.taskId = ''
      this.boardId = ''
      this.groupId = ''
      this.getTask(this.taskId)
   },
   methods: {
      // closemodal() {
      //    this.$router.push('/')
      // },
      // toggleLabels() {
      //    this.board.isLabelsShown = !this.board.isLabelsShown
      //    this.$store.dispatch({ type: 'updateBoard', board: this.board })
      // },
      goToPreviewEdit() {
         // this.$route.push(`/${this.group.id}/${this.task.id}`)
      },
      async updateTaskTitle(ev) {
         try {
            this.isTitleInputOpen = false
            this.isEditable = false
            ev.target.blur()
            this.taskToEdit.title = ev.target.value
            // this.$store.dispatch({ type: 'updateGroup', group: this.groupToEdit })
         } catch (err) {
            console.log(err)
         }
      },
      async getTask(taskId = 't101') {
         try {
            const currBoard = await this.$store.dispatch({ type: 'getBoardbyId', boardId: this.$route.params.boardId })
            // console.log('currBoard', currBoard)
            await currBoard.groups.forEach(group => group.tasks.find(task => {
               if (task.id === 't101') {
                  this.task = task
                  this.group = group
                  console.log('this.task', this.task)

               }
            }))
         } catch (err) {
            console.log(err)
         }
      },
   },
   computed: {
      isCoverBgc() {
         if (this.task.style.bgColor !== '#ffffff') return true
      },
      isHeight() {
         if (this.task.style.bgColor !== '#ffffff') return 32
         return 0
      },
      labelsHeight() {
         // if (this.board.isLabelsShown) return 16
         // return 8
         return 16
      },
      isWatchingBadge() {
         this.currLoggedUser = this.$store.getters.currLoggedUser
         const idx = this.task.members.findIndex(member => member._id === this.currLoggedUser._id)
         if (idx !== -1) return true
      },
      isDatesBadge() {
         if (this.task.startDate || this.task.dueDate) return true
      },
      organizedDates() {
         if (this.task.startDate.date && this.task.dueDate.date) {
            const from = this.task.startDate.date.slice(0, 6)
            const to = this.task.dueDate.date.slice(0, 6)
            return `${from}-${to}`
         } else if (this.task.startDate) return this.task.startDate.date.slice(0, 6)
         return this.task.dueDate.date.slice(0, 6)
      },
      titleInputFocus() {
         this.isTitleInputOpen = true
         // ev.target.select()
         // this.taskToEdit = JSON.parse(JSON.stringify(this.task))
         console.log(this.taskInput)
      },
      toggleModal(ev) {
         this.$emit('toggleModal', ev)
      },
      toggleEditing(ev) {
         this.isEditable = true
         ev.target.style.display = 'none'
         this.$nextTick(() => {
            this.$refs.textareainp.focus()
         })
      }
   },
}
</script>
