<template>
   <section class="group-preview-container">
      <section class="group-header-section">
         <!-- <div class="group-header-target"></div> -->
         <textarea
            class="group-header-title-textarea"
            :class="{ 'is-editing': isTitleInputOpen }"
            :draggable="{ isTitleInputOpen }"
            @focus="titleInputFocus"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="updateGroupTitle"
            @blur="updateGroupTitle"
            :value="group.title"
         ></textarea>
         <h2 class="group-header-title-assist">{{ group.title }}</h2>
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
         <!-- <div class="list-card" v-for="task in group.tasks" :key="task.id"> -->
         <!-- <router-link
            class="list-card"
            v-for="task in group.tasks"
            :key="task.id"
            :to="`/board/${board._id}/${group.id}/${task.id}`"
         >
            <task-preview :task="task"></task-preview> -->

         <template v-for="task in group.tasks">
            <task-preview
               :task="task"
               :board="board"
               :group="group"
               :key="task.id"
            />
         </template>

         <!-- </router-link> -->
         <!-- </div> -->

         <div class="task-composer-container">
            <div v-if="isTaskInputOpen" class="card-composer-open">
               <div class="add-task-input-section">
                  <div class="add-task-input-details group-task-link">
                     <textarea
                        type="text"
                        class="add-task-input"
                        v-model="taskInput"
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
         <a href="#" class="card-composer">
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
      modalListActions
   },
   data() {
      return {
         isOptionsListOpen: false,
         isTaskInputOpen: false,
         isTitleInputOpen: false,
         isDraggable: true,
         taskInput: '',
         lockInput: false,
         groupToEdit: null
      }
   },
   methods: {
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
            this.isDraggable = true
            ev.target.blur()
            this.groupToEdit.title = ev.target.value
            this.$store.dispatch({ type: 'updateGroup', group: this.groupToEdit })
         } catch (err) {
            console.log(err)
         }
      },
      titleInputFocus(ev) {
         this.isTitleInputOpen = true
         this.isDraggable = false
         ev.target.select()
         this.groupToEdit = JSON.parse(JSON.stringify(this.group))
      },
      toggleModal(ev) {
         this.$emit('toggleModal', ev)
      }
   },
   computed: {
      tasksList: {
         get() {
            return this.group.tasks
         },
         set(tasks) {
            this.$store.dispatch('updateTaskPositions', { tasks, group: this.group })
         }
      },
   }
}
</script>
