<template>
   <input id="label-toggler" :value="checked" ref="check" type="checkbox" @click.self.stop="toggleLabelsCheck" />
</template>

<script>

export default {
   name: 'label-checkboxes',
   props: {
      checked: Boolean, required: true
   },
   data() {
      return {
      }
   },
   methods: {
      toggleLabelsCheck() {
         this.$emit('labelsToggled')
      }
   }
}
</script>

<style>

</style>