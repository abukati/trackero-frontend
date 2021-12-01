<template>
   <div class="task-preview">
      <div class="task-title">
         {{ task.title }}
      </div>
   </div>
</template>

<script>
export default {
   props: ['task', 'group'],
   name: 'task-details',
   watch: {
      'showCardModal': {
         
      }
   }
}
</script>
