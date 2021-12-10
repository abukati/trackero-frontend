<template>
   <component
      :is="info.type"
      :info="info"
      @removeMember="removeMember"
      @addMember="addMember"
      @removeLabel="removeLabel"
      @addLabel="addLabel"
      @closeList="closeList"
      @addCheckList="addCheckList"
      @changeTaskCover="changeTaskCover"
      @removeTaskCover="removeTaskCover"
   >
   </component>
</template>

<script>
import membersList from './dynamic/members-list'
import labelsList from './dynamic/labels-list'
import checkList from './dynamic/check-list'
import coverMenu from './dynamic/cover-menu'
import attachmentList from './dynamic/attachment-list'
import datePicker from './dynamic/date-picker'

export default {
   name: "task-opts-list",
   props: ['info'],
   components: {
      membersList,
      labelsList,
      checkList,
      coverMenu,
      attachmentList,
      datePicker
   },
   created() {
   },
   methods: {
      removeMember(user) {
         this.$emit('removeMember', user)
      },
      addMember(user) {
         this.$emit('addMember', user)
      },
      removeLabel(label) {
         this.$emit('removeLabel', label)
      },
      addLabel(label) {
         this.$emit('addLabel', label)
      },
      addCheckList(title) {
         this.$emit('addCheckList', title)
      },
      changeTaskCover(color) {
         this.$emit('changeTaskCover', color)
      },
      removeTaskCover() {
         this.$emit('removeTaskCover')
      },
      closeList() {
         this.$emit('closeList')
      },
   }
}
</script>