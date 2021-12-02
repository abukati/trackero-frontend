<template>
   <section class="group-preview-container">
      <section class="group-header-section">
         <div class="title-section">
            <textarea
               class="group-title-textarea"
               :class="{ 'title-editing': isTitleInputOpen, noselect: lockInput }"
               v-model="newGroupTitle"
               @input="changeGroupTitle"
               @focus="$event.target.select()"
               @blur="changeGroupTitle"
            ></textarea>
         </div>
         <div class="title-actions-section">
            <button @click="toggleOptions">
               <img :src="require(`@/assets/img/option.png`)" />
            </button>
         </div>
         <section v-show="isListOpen" class="list-actions">
            <h3>List actions</h3>
            <button @click="toggleOptions">X</button>
            <button @click="deleteGroup">Delete Card</button>
         </section>
      </section>
      <div class="tasks-and-input-section">
         <draggable
            class="group-tasks-section"
            v-model="tasksList"
            group="group"
            draggable=".group-task"
         >
            <div class="group-task" v-for="task in group.tasks" :key="task.id">
               <router-link
                  :to="`/board/${board._id}/${group.id}/${task.id}`"
                  class="group-task-link"
               >
                  {{ task.id }}
                  <div class="task-cover" :style="{ backgroundColor: task.style.bgColor }">
                     (cover)
                  </div>
                  <span class="group-task-options"></span>
                  <div class="group-task-preview">
                     <!-- <div class="group-task-labels">{{ task.labels }}</div> -->
                     <div class="group-task-title">{{ task.title }}</div>
                     <!-- <div class="group-task-badges"></div>
                  <div class="group-task-members">{{ task.members }}</div> -->
                  </div>
               </router-link>
            </div>
         </draggable>
         <div class="add-task-section">
            <div @click="toggleInput">+ Add a task</div>
            <div v-if="isTaskInputOpen" class="task-add">
               <input type="text" class="add-task-input" v-model="taskInput" placeholder="Enter a title for this task" />
               <button @click="addTask">Add task</button>
               <button @click="toggleInput">X</button>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
import { showMsg } from '@/services/event-bus-service.js'
import draggable from 'vuedraggable'

export default {
   props: ['group', 'board'],
   name: 'groupPreview',
   components: {
      draggable
   },
   data() {
      return {
         isListOpen: false,
         isTaskInputOpen: false,
         isTitleInputOpen: false,
         taskInput: '',
         newGroupTitle: '',
         lockInput: false
      }
   },
   created() {
      this.newGroupTitle = JSON.parse(JSON.stringify(this.group.title))
   },
   methods: {
      toggleOptions() {
         this.isListOpen = !this.isListOpen
      },
      toggleInput() {
         this.isTaskInputOpen = !this.isTaskInputOpen
      },
      async addTask() {
         try {
            const groupId = this.group.id
            const newTask = this.$store.dispatch('addTask', {
               groupId,
               title: this.taskInput
            })

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
            this.isListOpen = false
            if (deletedId) showMsg(`group removed ${deletedId}`)
            else showMsg(`Yoy are not allowed to remove group`, 'danger')
         } catch (err) {
            console.log(err)
         }
      },
      async changeGroupTitle(ev) {
         try {
            this.isTitleInputOpen = false
            const groupId = this.group.id
            const newTitle = await this.$store.dispatch({ type: 'changeGroupTitle', newTitle: this.newGroupTitle, groupId })
         } catch (err) {
            console.log(err)
         }
      },
      titleInputFocus(ev) {
         this.isTitleInputOpen = true
         return this.isTitleInputOpen ? ev.target.select() : ''
      }

      // saveGroupTitle(ev) {
      //    if (ev.keyCode === 13) {
      //       ev.preventDefault()
      //       this.isTitleInputOpen = false
      //    }
      // }
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
