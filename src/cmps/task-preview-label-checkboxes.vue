<template>
   <input id="label-toggler" :value="checked" ref="check" type="checkbox" @click.self.stop="toggleCheckbox" />
</template>

<script>

export default {
   name: 'label-checkboxes',
   props: {
      checked: Boolean, required: true,
      toggleCheckbox: Function, required: true
   }
}
</script>

<style>

</style>