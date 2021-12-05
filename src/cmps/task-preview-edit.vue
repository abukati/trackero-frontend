<template>
   <div class="window-overlay" @click.prevent.self="closemodal()">
      <div class="window">
         <div class="window-wrapper">
            <a @click="closemodal()" class="dialog-close-button">
               <img src="@/assets/img/close-icon.svg" />
            </a>
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
         taskId: '',
         boardId: '',
         groupId: ''

      }
   },
   created() {
      this.taskId = this.$route.params.taskId
      this.boardId = this.$route.params.boardId
      this.groupId = this.$route.params.groupId
      this.getTask(this.taskId)
   },
   methods: {
      closemodal() {
         this.$router.push('/')
      },
      async getTask(taskId) {
         try {
            const currBoard = await this.$store.dispatch({ type: 'getBoardbyId', boardId: this.$route.params.boardId })
            console.log('currBoard', currBoard)
            currBoard.groups.forEach(group => group.tasks.find(task => {
               if (task.id === this.taskId) {
                  this.task = task
                  this.groupTitle = group.title
                  console.log('this.task', this.task)
                  console.log('this.groupTitle', this.groupTitle)

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
         else return 0
      },
   },
}
</script>
