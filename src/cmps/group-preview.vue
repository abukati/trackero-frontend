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
      <draggable v-model="tasksList" >
         <div class="group-tasks" v-for="task in group.tasks" :key="task.id">
            <router-link :to="`/board/${board._id}/${group.id}/${task.id}`" class="group-task">
               {{task.id}}
               <div class="task-cover" :style="{ backgroundColor: task.style.bgColor }">dd</div>
               <span class="group-task-options"></span>
               <div class="group-task-preview">
                  <div class="group-task-labels">{{ task.labels }}</div>
                  <div class="group-task-title">{{ task.title }}</div>
                  <div class="group-task-badges"></div>
                  <div class="group-task-members">{{ task.members }}</div>
               </div>
            </router-link>
         </div>
      </draggable>
   </section>
</template>

<script>
import { showMsg } from '@/services/event-bus-service.js'
import draggable from "vuedraggable"

export default {
   props: ['group', 'board'],
   name: 'groupPreview',
   components: {
      draggable,
   },
   data() {
      return {
         isListOpen: false,
         // showCardModal: false
      }
   },
   created() {},
   methods: {
      toggleOptions() {
         this.isListOpen = !this.isListOpen
      },
      // showCardDetails() {
      //    this.showCardModal = !this.showCardModal
      // },
      async deleteGroup() {
         try {
            const groupId = this.group.id
            const deletedId = this.$store.dispatch({ type: 'removeGroup', groupId })
            this.isListOpen = false
            if (deletedId) showMsg(`group removed ${deletedId}`)
            else showMsg(`Yoy are not allowed to remove`, 'danger')
         } catch (err) {
            console.log(err)
         }
      },
   },
   computed: {
      tasksList: {
         get() {
            return this.group.tasks
         },
         set(tasks) {
            this.$store.dispatch('updateTaskPositions', { tasks, group: this.group } )
         }
      }
   }
}
</script>
