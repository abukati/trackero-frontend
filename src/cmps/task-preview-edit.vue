<template>
   <div v-if="task" class="quick-card-editor">
      <span class="icon-lg icon-close quick-card-editor-close-icon"> </span>
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
                  @keydown.enter.exact.prevent
                  @keyup.enter.exact="updateTaskTitle"
                  @focus="titleInputFocus"
                  @blur="updateTaskTitle"
                  :value="task.title"
               />

               <!-- badges -->
               <div class="badges">
                  <span class="js-badges">
                     <div
                        v-if="isWatchingBadge"
                        class="badge"
                        title="You are watching this card."
                     >
                        <span class="badge-icon icon-sm icon-subscribe"></span>
                     </div>
                     <div
                        v-if="isDatesBadge"
                        class="badge is-due-soon"
                        title="This card is due in less than twenty-four hours."
                     >
                        <span
                           class="
                              badge-icon
                              icon-sm icon-clock
                              badge-due-icon
                              is-due-soon-span
                           "
                        ></span>
                        <span class="badge-text js-due-date-text">
                           {{ organizedDates }}
                        </span>
                     </div>
                     <div
                        v-if="task.description"
                        class="badge is-icon-only"
                        title="This card has a description."
                     >
                        <span
                           class="badge-icon icon-sm icon-description"
                        ></span>
                     </div>
                     <div
                        v-if="task.comments && task.comments.length"
                        class="badge is-icon-only"
                        title="Comments"
                     >
                        <span class="badge-icon icon-sm icon-comment"></span>
                        <span class="badge-text">{{
                           task.comments.length
                        }}</span>
                     </div>
                     <div
                        v-if="task.attachments && task.attachments.length"
                        class="badge"
                        title="Attachments"
                     >
                        <span class="badge-icon icon-sm icon-attachment"></span>
                        <span class="badge-text">{{
                           task.attachments.length
                        }}</span>
                     </div>
                     <div
                        v-if="task.location.id"
                        class="badge"
                        title="This card has a location."
                     >
                        <span class="badge-icon icon-sm icon-location"></span>
                     </div>
                     <div
                        v-if="isChecklist"
                        class="badge"
                        title="Checklist items"
                     >
                        <span class="badge-icon icon-sm icon-checklist"></span>
                        <span class="badge-text">{{ checklistItems }}</span>
                     </div>
                  </span>
               </div>

               <!-- task-members -->
               <div
                  div
                  v-if="task.members && task.members.length"
                  class="task-detail-members-list list-card-members"
               >
                  <a
                     class="member task-detail-member"
                     v-for="member in task.members"
                     :key="member._id"
                  >
                     <avatar
                        :size="28"
                        :username="member.fullname"
                        :title="`${member.fullname}(${member.username})`"
                     />
                  </a>
               </div>
            </div>
         </div>

         <input
            class="nch-button nch-button--primary wide js-save-edits"
            type="submit"
            value="Save"
         />
      </div>
   </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
   name: 'task-edit',
   components: {
      Avatar
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
            console.log('this.taskToEdit', this.taskToEdit)
            console.log('groupId: this.groupId', this.groupId)
            await this.$store.dispatch({ type: 'updateTask', task: this.taskToEdit, groupId: this.groupId })
         } catch (err) {
            console.log(err)
         }
      },
      titleInputFocus(ev) {
         this.isTitleInputOpen = true
         ev.target.select()
         console.log('this.taskToEdit', this.taskToEdit)
         // this.groupToEdit = JSON.parse(JSON.stringify(this.group))
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
      },
      async getTask(taskId = 't101') {
         try {
            const currBoard = await this.$store.dispatch({ type: 'getBoardbyId', boardId: this.$route.params.boardId })
            // console.log('currBoard', currBoard)
            await currBoard.groups.forEach(group => group.tasks.find(task => {
               if (task.id === 't101') {
                  this.task = task
                  this.taskToEdit = JSON.parse(JSON.stringify(task))
                  this.group = group
                  this.groupId = group.id
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
      checklistItems() {
         let count = 0
         this.task.checklists[0].todos.forEach(todo => {
            if (todo.isDone) count++
         })
         return `${count} / ${this.task.checklists[0].todos.length}`
      },
      isChecklist() {
         if (this.task.checklists[0] && this.task.checklists[0].id) return true
      }

   },
}
</script>
