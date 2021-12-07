<template>
<div class="window-module task-detail-checklist">
    <div class="checklist">
        <div class="window-module-title no-divider">
            <span class="checklist-icon icon-lg"></span>
            <div class="checklist-title">
                <h3>Checklist</h3>
                <div class="title-options">
                    <a @click="deleteList(checklist.id)" class="nch-button delete-btn" href="#">Delete</a>
                </div>
            </div>
        </div>
        <div class="checklist-progress">
            <span class="checklist-progress-percentage">0%</span>
            <div class="checklist-progress-bar">
                <div class="checklist-progress-bar-current"></div>
                <span class="checklist-completed-text hide">Everything in this checklist is complete!</span>
            </div>
        </div>
        <div class="checklist-items-list" v-for="todo in checklist.todos" :key="todo.id">
                <todoPreview @removeTodo="removeTodo" :todo="todo"/>
        </div>
        <div class="checklist-new-item">
            <button v-if="!isAddItemOpen" class="nch-button" @click="toggleAdd">Add an item</button>
            <div v-else>
                <textarea v-model="newTodo.text" ref="textareainp" class="checklist-new-item-text" placeholder="Add an item" spellcheck="false"></textarea>
                <div class="checklist-add-controls clearfix">
                    <input @click="addTodo" class="nch-button nch-button-primary" type="submit" value="Add">
                    <a @click="toggleAdd" class="icon-lg icon-close"></a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import todoPreview from '@/cmps/todo-preview.vue'
export default {
    name:'checklist-preview',
    props: {
		task: Object, required: true,
        checklist:Object, required: true,
	},
    components: {
        todoPreview,
    },
    data(){
        return{
            isAddItemOpen:false,
            newTodo: { text: '', isDone: false },
        }
    },
    methods:{
        toggleAdd(){
            this.isAddItemOpen = !this.isAddItemOpen
            if(this.isAddItemOpen) {
                this.$nextTick(() => {
                    this.$refs.textareainp.select()
                })
            }     
        },
        updateTask(){
            this.$emit('updateTask')
        },
        deleteList(id){
            const listIdx = this.task.checklists.findIndex(currList => currList.id === id)
            this.task.checklists.splice(listIdx, 1)
            this.updateTask()
        },
        removeTodo(id){
			const checklist = this.task.checklists.find(currChecklist => currChecklist.id === this.checklist.id);
			const todoIdx = checklist.todos.findIndex(currTodo => currTodo.id === id);
			checklist.todos.splice(todoIdx,1);
			this.updateTask()
        },
        addTodo(){
            this.$emit('addTodo',this.newTodo, this.checklist.id)
            this.resetData()
        },
        resetData(){
         this.newTodo = { text: '', isDone: false }
        }
    },
}
</script>