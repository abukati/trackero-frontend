<template>
  <component 
    :is="info.type"
    :info="info"
    @removeMember="removeMember"
    @addMember="addMember"
    @removeLabel="removeLabel"
    @addLabel="addLabel"
    @toggleList="toggleList"
    >  
  </component>
</template>

<script>
import membersList from './dynamic/members-list'
import labelsList from './dynamic/labels-list'
import checkList from './dynamic/check-list'

export default {
    name:"task-opts-list",
    props:['info'],
    components: {
        membersList,
        labelsList,
        checkList,
    },
    methods: {
        removeMember(user){
            this.$emit('removeMember',user)
        },
        addMember(user){
            this.$emit('addMember',user)
        },
        removeLabel(label){
            this.$emit('removeLabel',label)
        },
        addLabel(label){
            this.$emit('addLabel',label)
        },
        toggleList(){
            this.$emit('toggleList')
        }
    }
}
</script>