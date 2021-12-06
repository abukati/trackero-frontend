<template>
   <!-- <section class="list-card-preview"> -->
   <router-link
      class="list-card"
      :to="`/board/${board._id}/${group.id}/${task.id}`"
      ><div>
         <!-- cover -->
         <div
            v-if="isCoverBgc"
            class="list-card-cover"
            :style="{
               backgroundColor: task.style.bgColor,
               height: isHeight + 'px',
            }"
         >
            <span
               @click.prevent="openPreviewEdit($event)"
               class="icon-edit icon-sm list-card-operation"
            ></span>
         </div>

         <!-- pencil-edit -->
         <div
            @click.prevent="openPreviewEdit($event)"
            v-if="!isCoverBgc"
            class="list-card-edit-pencil"
         >
            <span class="icon-sm icon-edit list-card-operation"></span>
         </div>

         <!-- list-card-details -->
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
                  @click.prevent="toggleLabels"
               >
                  <span v-if="board.isLabelsShown" class="label-text">{{
                     label.title
                  }}</span>
               </span>
            </div>
            <div class="list-card-title">
               <span class="task-id hide">{{ task.id }}</span>
               <span>{{ task.title }}</span>
            </div>

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
                     <span class="badge-icon icon-sm icon-description"></span>
                  </div>
                  <div
                     v-if="task.comments && task.comments.length"
                     class="badge is-icon-only"
                     title="Comments"
                  >
                     <span class="badge-icon icon-sm icon-comment"></span>
                     <span class="badge-text">{{ task.comments.length }}</span>
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
                  <div v-if="isChecklist" class="badge" title="Checklist items">
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
   </router-link>
   <!-- </section> -->
</template>

<script>
import Avatar from 'vue-avatar'
export default {
   props: ['task', 'group', 'board'],
   components: {
      Avatar
   },
   data() {
      return {
         labelsAreOpen: true,
         currLoggedUser: null,
         modalPos: {}
      }
   },
   created() {

   },
   methods: {
      toggleLabels() {
         this.board.isLabelsShown = !this.board.isLabelsShown
         this.$store.dispatch({ type: 'updateBoard', board: this.board })
      },
      goToPreviewEdit() {
         // this.$route.push(`/${this.group.id}/${this.task.id}`)
      },
      openPreviewEdit(ev) {
         const { left, top } = ev.target.offsetParent.getBoundingClientRect()
         this.modalPos.top = Math.ceil(top)
         this.modalPos.left = Math.ceil(left)
         if (!this.isCoverBgc) this.modalPos.left = ev.target.offsetParent.offsetParent.getBoundingClientRect().left
         this.$emit('openPreviewEdit', this.group, JSON.parse(JSON.stringify(this.task)), this.modalPos)
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
         if (this.board.isLabelsShown) return 16
         return 8
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
         this.task.checklists.forEach(checklist => {
            for (const property in checklist.todos) {
               // console.log('checklist[property]', checklist.todos[property])
               if (checklist.todos[property].isDone) count++
            }
         })


         return `${count} / ${this.task.checklists[0].todos.length}`
      },
      isChecklist() {
         if (this.task.checklists[0] && this.task.checklists[0].id) return true
      }



   },
}
</script>

