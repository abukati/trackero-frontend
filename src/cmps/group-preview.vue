<template>
   <section>
      <section class="header-section">
         <div class="title-section">
            <h3>{{ group.title }}</h3>
         </div>
         <div class="title-actions-section">
            <button @click="toggleOptions">***</button>
         </div>
      </section>
      <section v-if="isListOpen" class="list-actions">
         <h3>List actions</h3>
         <button @click="toggleOptions">X</button>
         <button @click="deleteGroup">Delete Card</button>
      </section>
      <div class="group-tasks" v-for="task in group.tasks" :key="task.id">
         <router-link class="group task" :to="``">{{ task.title }}</router-link>
      </div>
      <div class="add-task-section">
         <div @click="toggleInput">+ Add a task</div>
         <div v-if="isTaskInputOpen" class="task-add">
            <input
               type="text"
               class="add-task-input"
               v-model="taskInput"
               placeholder="Enter a title for this task"
            />
            <button @click="addTask">Add task</button>
            <button @click="toggleInput">X</button>
         </div>
      </div>
   </section>
</template>

<script>
import { showMsg } from '@/services/event-bus-service.js'

export default {
   props: ['group'],
   name: 'groupPreview',
   data() {
      return {
         isListOpen: false,
         isTaskInputOpen: false,
         taskInput: ''
      }
   },
   created() { },
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
            const deletedId = this.$store.dispatch({
               type: 'removeGroup',
               groupId,
            })
            this.isListOpen = false
            if (deletedId) showMsg(`group removed ${deletedId}`)
            else showMsg(`Yoy are not allowed to remove group`, 'danger')
         } catch (err) {
            console.log(err)
         }
      },
   },
   computed: {},
}
</script>
