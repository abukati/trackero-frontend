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
         <router-link class="group task" :to="``">{{ task }}</router-link>
      </div>
   </section>
</template>

<script>
import { showMsg } from "@/services/event-bus-service.js"

export default {
   props: ["group"],
   name: "groupPreview",
   data() {
      return {
         isListOpen: false,
      }
   },
   created() { },
   methods: {
      toggleOptions() {
         if (this.isListOpen) {
            this.isListOpen = false
         } else this.isListOpen = true
      },
      async deleteGroup() {
         try {
            const groupId = this.group.id
            const deletedId = this.$store.dispatch({
               type: "removeGroup",
               groupId,
            })
            this.isListOpen = false
            if (deletedId) showMsg(`group removed ${deletedId}`)
            else showMsg(`Yoy are not allowed to remove`, "danger")
         } catch (err) {
            console.log(err)
         }
      },
   },
   computed: {},
};
</script>
