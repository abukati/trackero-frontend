<template>
   <section>
      <div class="group-task" v-for="task in group.tasks" :key="task.id">
         {{ task }}
         <hr />
      </div>
   </section>
</template>

<script>
export default {
   props: ['group'],
}
</script>
