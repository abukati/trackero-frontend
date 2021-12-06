<template>
   <section class="group-preview-container">
      <section class="group-header-section">
         <h2
            v-if="isEditable === false"
            @mouseup="toggleEditing"
            class="group-header-title-assist"
         >
            {{ group.title }}
         </h2>
         <textarea
            v-else
            ref="textareainp"
            class="group-header-title-textarea"
            :class="{ 'is-editing': isTitleInputOpen }"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="updateGroupTitle"
            @focus="titleInputFocus"
            @blur="updateGroupTitle"
            :value="group.title"
         ></textarea>
         <div class="group-header-options">
            <button @click="toggleOptions">
               <img :src="require(`@/assets/img/option.png`)" />
            </button>
         </div>
         <modal-list-actions
            v-if="this.isOptionsListOpen"
            :group="group"
            :board="board"
            @closeModal="toggleOptions"
            @openAddTask="toggleInput"
         />
      </section>
      <draggable
         class="group-tasks-section"
         v-model="tasksList"
         group="group"
         draggable=".list-card"
      >
         <template v-for="task in group.tasks">
            <task-preview
               @checkLabels="toggleCheckbox"
               @openPreviewEdit="openPreviewEdit"
               :task="task"
               :board="board"
               :group="group"
               :key="task.id"
            />
         </template>

         <div class="task-composer-container">
            <div v-if="isTaskInputOpen" class="card-composer-open">
               <div class="add-task-input-section">
                  <div class="add-task-input-details group-task-link">
                     <!-- <textarea type="text" class="add-task-input"
                        v-model="taskInput" placeholder="Enter a title for this card..." /> -->
                     <textarea-autosize
                        class="add-task-input"
                        v-model="taskInput"
                        type="text"
                        placeholder="Enter a title for this card..."
                     />
                  </div>
               </div>
               <div class="add-task-control-section">
                  <button @click="addTask" class="add-card-confirm-btn">
                     Add card
                  </button>
                  <span @click="toggleInput" class="cancel-add-card">
                     <img src="@/assets/img/cancel-icon.svg" />
                  </span>
               </div>
            </div>
         </div>
      </draggable>
      <div v-if="!isTaskInputOpen" @click="toggleInput" class="add-task-button">
         <a class="card-composer">
            <span class="add-task-plus-icon">
               <img src="@/assets/img/plus-icon.svg" />
            </span>
            <span class="add-task-span">Add a card</span>
         </a>
      </div>
   </section>
</template>

<script>
import { showMsg } from '@/services/event-bus-service.js'
import draggable from 'vuedraggable'
import taskPreview from './task-preview.vue'
import modalListActions from './modal-list-actions.vue'

export default {
   props: ['group', 'board'],
   name: 'groupPreview',
   components: {
      draggable,
      taskPreview,
      modalListActions,
   },
   data() {
      return {
         isOptionsListOpen: false,
         isTaskInputOpen: false,
         isTitleInputOpen: false,
         taskInput: '',
         groupToEdit: null,
         isEditable: false,
         isPreviewEdit: false,
         currTask: null,
         task: null,
      }
   },

   methods: {
      toggleCheckbox(ref) {
         console.log(ref);
      },
      toggleOptions() {
         this.isOptionsListOpen = !this.isOptionsListOpen
      },
      toggleInput() {
         this.isTaskInputOpen = !this.isTaskInputOpen
         this.isOptionsListOpen = false
      },
      async addTask() {
         try {
            const groupId = this.group.id
            const newTask = this.$store.dispatch('addTask', { groupId, title: this.taskInput })
            this.isTaskInputOpen = false
            this.taskInput = ''
            if (newTask) showMsg(`task added `)
            else showMsg(`Yoy are not allowed to add task`, 'danger')
         } catch (err) {
            console.log(err)
         }
      },
      async deleteGroup() {
         try {
            const groupId = this.group.id
            const deletedId = this.$store.dispatch({ type: 'removeGroup', groupId })
            this.isOptionsListOpen = false
            if (deletedId) showMsg(`group removed ${deletedId}`)
            else showMsg(`Yoy are not allowed to remove group`, 'danger')
         } catch (err) {
            console.log(err)
         }
      },
      async updateGroupTitle(ev) {
         try {
            this.isTitleInputOpen = false
            this.isEditable = false
            ev.target.blur()
            this.groupToEdit.title = ev.target.value
            this.$store.dispatch({ type: 'updateGroup', group: this.groupToEdit })
         } catch (err) {
            console.log(err)
         }
      },
      titleInputFocus(ev) {
         this.isTitleInputOpen = true
         ev.target.select()
         // this.groupToEdit = JSON.parse(JSON.stringify(this.group))
         this.groupToEdit = this.group
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
      openPreviewEdit(group, task, modalPos) {
         this.task = task
         this.isPreviewEdit = true
         this.$emit('onlyOneEdit', group, task, modalPos)
      },


   },
   computed: {
      tasksList: {
         get() {
            return this.group.tasks
         },
         set(tasks) {
            this.$store.dispatch('updateTaskPositions', { tasks, group: this.group })
         },

      },
   }
}
</script>
