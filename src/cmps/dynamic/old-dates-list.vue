<template>
   <div>
      <h1>dates</h1>
      <example-dates
         @selected="doSomethingInParentComponentFunction"
         @opened="datepickerOpenedFunction"
         @closed="datepickerClosedFunction"
      ></example-dates>
   </div>
</template>

<script>
import exampleDates from '@/cmps/dynamic/date-picker.vue'
import Datepicker from 'vuejs-datepicker'
export default {
   name: "dates-list",
   components: {
      Datepicker,
      exampleDates
   },
   props: ['info'],
   data() {
      return {
         filterBy: {
            title: '',

         },

         task: this.info.task
      }
   },
   methods: {

      toggleList() {
         this.$emit('toggleList')
      },
      doSomethingInParentComponentFunction(ev) {
         console.log('ev', ev)
      },
      datepickerOpenedFunction(ev) {
         console.log('ev', ev)
      },
      datepickerClosedFunction(ev) {
         console.log('ev', ev)
      }


   },
   computed: {

   }
}
</script>