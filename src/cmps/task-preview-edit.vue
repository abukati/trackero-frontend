<template>
   <div
      v-if="task"
      class="quick-card-editor"
      @click.prevent.self="closePreviewEdit()"
   >
      <span
         @click="closePreviewEdit"
         class="icon-lg icon-close quick-card-editor-close-icon"
      >
      </span>
      <div
         class="quick-card-editor-card"
         :style="{ left: modalPos.left + 'px', top: modalPos.top + 'px' }"
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
                     :class="'label-' + label.color"
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
                  :value="taskToEdit.title"
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
                     class="member"
                     v-for="member in task.members"
                     :key="member._id"
                     style="float: left"
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

         <button
            class="nch-button nch-button-primary wide js-save-edits"
            type="submit"
            @click="updateTaskTitle"
            :value="taskToEdit.title"
         >
            Save
         </button>

         <div class="quick-card-editor-buttons fade-in">
            <router-link
               :to="'/board/' + boardId + '/' + groupId + '/' + taskId"
               class="quick-card-editor-buttons-item"
            >
               <span class="icon-sm icon-card light"></span>
               <span class="quick-card-editor-buttons-item-text"
                  >Open card</span
               >
            </router-link>
            <a
               @click="renderLabels"
               class="quick-card-editor-buttons-item js-edit-labels"
            >
               <span class="icon-sm icon-label light"></span>
               <span class="quick-card-editor-buttons-item-text">
                  Edit labels
               </span>
            </a>
            <a class="quick-card-editor-buttons-item js-edit-members">
               <span class="icon-sm icon-member light"></span>
               <span class="quick-card-editor-buttons-item-text">
                  Change members
               </span>
            </a>
            <a class="quick-card-editor-buttons-item js-edit-cover">
               <span class="icon-sm icon-card-cover light"></span>
               <span class="quick-card-editor-buttons-item-text">
                  Change cover
               </span>
            </a>
            <a class="quick-card-editor-buttons-item js-move-card">
               <span class="icon-sm icon-move light"></span>
               <span class="quick-card-editor-buttons-item-text"> Move </span>
            </a>
            <a class="quick-card-editor-buttons-item js-copy-card">
               <span class="icon-sm icon-card light"></span>
               <span class="quick-card-editor-buttons-item-text"> Copy</span>
            </a>
            <a class="quick-card-editor-buttons-item js-edit-due-date">
               <span class="icon-sm icon-clock light"> </span>
               <span class="quick-card-editor-buttons-item-text">
                  Edit dates
               </span>
            </a>
            <a
               @click="archiveTask"
               class="quick-card-editor-buttons-item js-archive"
            >
               <span class="icon-sm icon-archive light"></span>
               <span class="quick-card-editor-buttons-item-text">
                  Archive
               </span>
            </a>
         </div>
      </div>
      <!-- <labels-list v-if="isListRendered" :info="info" /> -->
      <attachment-list v-if="isListRendered" :info="info" />
   </div>
</template>

<script>
import Avatar from 'vue-avatar'
import labelsList from './dynamic/labels-list.vue'
import attachmentList from './dynamic/attachment-list.vue'

export default {
   name: 'task-edit',
   props: ['task', 'group', 'board', 'modalPos'],
   components: {
      Avatar, labelsList, attachmentList
   },
   data() {
      return {
         groupTitle: '',
         taskId: '',
         currLoggedUser: null,
         boardId: '',
         groupId: '',
         isTitleInputOpen: false,
         taskInput: '',
         taskToEdit: null,
         isEditable: false,
         info: {},
         isListRendered: false

      }
   },
   created() {
      // console.log('this.task.id', this.task.id)
      // this.getTask(this.t1askId)
      this.taskToEdit = JSON.parse(JSON.stringify(this.task))
      this.groupId = this.group.id
      this.boardId = this.board._id
      this.taskId = this.task.id
      this.info.task = this.task
   },
   methods: {
      closePreviewEdit() {
         // console.log('this.task', this.task)
         this.$emit('closePreviewEdit')
      },

      async updateTaskTitle(ev) {
         try {
            this.isTitleInputOpen = false
            this.isEditable = false
            ev.target.blur()
            this.taskToEdit.title = ev.target.value
            await this.$store.dispatch({ type: 'updateTask', task: this.taskToEdit, groupId: this.groupId })
            this.closePreviewEdit()
         } catch (err) {
            console.log(err)
         }
      },
      titleInputFocus(ev) {
         this.isTitleInputOpen = true
         ev.target.select()
         // this.groupToEdit = JSON.parse(JSON.stringify(this.group))
      },

      toggleEditing(ev) {
         this.isEditable = true
         ev.target.style.display = 'none'

      },
      renderLabels() {
         this.isListRendered = !this.isListRendered
      },
      async archiveTask() {
         try {
            this.taskToEdit.isArchived = true
            await this.$store.dispatch({ type: 'updateTask', groupId: this.groupId, task: this.taskToEdit })
            this.closePreviewEdit()
         } catch (err) {
            console.log(err)
         }
      }


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
