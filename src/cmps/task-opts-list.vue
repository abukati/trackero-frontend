<template>
  <component 
    :is="info.type"
    :info="info"
    @removeMember="removeMember"
    @addMember="addMember"
    @toggleList="toggleList"
    >  
  </component>
</template>

<script>
import membersList from './dynamic/members-list'
import labelsList from './dynamic/labels-list'
export default {
    name:"task-opts-list",
    props:['info'],
    components: {
        membersList,
        labelsList
    },
    methods: {
        removeMember(user){
            this.$emit('removeMember',user)
        },
        addMember(user){
            this.$emit('addMember',user)
        },
        toggleList(){
            this.$emit('toggleList')
        }
    }
}
</script>