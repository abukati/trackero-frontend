<template>
  <div class="checklist-item">
      <div class="checklist-item-checkbox">
          <span class="checklist-item-checkbox-check"></span>
      </div>
      <div class="checklist-item-details">
          <div class="checklist-item-row">
              <div class="checklist-item-text-and-controls">
                  <span class="checklist-item-details-text">
                      {{todo.text}}
                  </span>
                  <div class="checklist-item-controls">
                      <button @click="remove(todo.id)">X</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'todo-preview',
    props:['todo'],
    methods:{
        remove(id){
            this.$emit('removeTodo',id)
        }
    }
}
</script>
