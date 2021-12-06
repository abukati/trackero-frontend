<template>
	<div class="window-overlay" @click.prevent.self="closemodal()">
		<div class="window">
			<div class="window-wrapper">
				<a @click="closemodal()" class="dialog-close-button" :class="[isCoverBgc ? 'dark':'']">
					<img src="@/assets/img/close-icon.svg" />
				</a>
				<div class="task-detail clearfix">
               		<!-- <div class="task-cover"> -->
               <div v-if="isCoverBgc" class="task-cover" :style="{backgroundColor: task.style.bgColor,height: isHeight + 'px'}">
						<div class="task-cover-menu">
							<a class="task-cover-menu-button">
                        <span class="icon-sm cover-menu-btn-icon"></span>
                     Cover
							</a>
                  </div> 
               </div>
			      <!-- </div> -->
            <div class="window-header">
               <span class="window-header-icon icon-lg"></span>
               <div class="window-title">
                  <textarea-autosize class="task-detail-title-input" rows="1" :value="task.title"/>
               </div>
               <div class="window-header-inline-content">
                  <p class="u-bottom">in list <a href="#">{{groupTitle}}</a></p>
               </div>
            </div>
            <div class="window-main-col no-box-sizing ">
               <div class="task-detail-data clearfix">
                  <div class="task-detail-item hide">
                     <h3 class="task-detail-item-header">List</h3>
                     <div class="task-detail-list-badge">
                        <button class="task-detail-list-badge-btn badge-button button-link">
                        </button>
                     </div>
                  </div>
                  <div v-if="task.members.length" class="task-detail-item clearfix">
                     <h3 class="task-detail-item-header">Members</h3>
                     <div v-if="task.members && task.members.length" class="task-detail-members-list">
                        <a class="member task-detail-member" v-for="member in task.members" :key="member._id"
                            @click="toggleMiniProfile($event,member)">
                           <avatar :size="32" :username="member.fullname" :title="`${member.fullname}(${member.username})`" />
                        </a>
                        <a class="task-detail-add-button">
                           <span class="add-btn-icon icon-lg">
                              <img src="@/assets/img/plus-icon.svg"/>
                           </span>
                        </a>
                     </div>
                     <mini-profile v-if="profileOfUser" :isMiniProfileOpen="isMiniProfileOpen"
                      :modalPos="getModalPos" 
                      :user="profileOfUser"
                      @closeMiniProfile="closeMiniProfile"
                      @removeTaskMember="removeTaskMember" />
                  </div>
                  <div v-if="task.labels.length" class="task-detail-item clearfix">
                     <h3 class="task-detail-item-header">Labels</h3>
                     <div v-if="task.labels && task.labels.length" class="task-detail-labels-list">
                           <span v-for="label in task.labels" :key="label.id" class="card-label task-detail-label" :style="{ backgroundColor: label.color }">
                              <span class="label-text">{{ label.title }}</span>
                           </span>
                      <a class="task-detail-add-button">
                        <span class="add-btn-icon icon-lg">
                           <img src="@/assets/img/plus-icon.svg"/>
                        </span>
                     </a>
                     </div>
                  </div>
                  <div class="task-detail-item" v-if="(task.startDate.date && !task.dueDate.date)">
                     <h3 class="task-detail-item-header">Start date</h3>
                        <div class="start-date-badge">
                           <div class="content-container">
                              <button class="dates-btn">
                                 <span>{{task.startDate.date.slice(0, 6)}}</span>
                                    <span class="icon-container">
                                       <span class="open-dates-icon">
                                          <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
                                       </span>
                                    </span>
                              </button>
                           </div>
                        </div>
                  </div>
                  <div class="task-detail-item" v-if="(task.startDate.date || task.dueDate.date)">
                     <h3 v-if="(task.startDate.date && task.dueDate.date)" class="task-detail-item-header">Dates</h3>
                     <h3 v-else class="task-detail-item-header">Due date</h3>
                       <div class="task-detail-dates-badge">
                           <a class="complete-box" href="#" role="button">
                              <span class="complete-icon ">
                                 <!-- <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg> -->
                              </span>
                           </a>
                        <div class="content-container">
                           <button class="dates-btn">
                              <span>{{dateToShow}}</span>
                                 <span class="icon-container">
                                    <span class="open-dates-icon">
                                       <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
                                    </span>
                                 </span>
                           </button>
                        </div>
                     </div>
                  </div>
                  <div class="task-detail-item hide">
                     <h3 class="task-detail-item-header">Votes</h3>
                     <a class="task-detail-badge"></a>
                  </div>
                  <div class="task-detail-item hide">
                     <h3 class="task-detail-item-header">Last updated</h3>
                     <div class="task-detail-badge task-detail-last-updated"></div>
                  </div>
               </div>
               <div class="task-detail-desc">
                     <div class="window-module">
                        <div class="window-module-title">
                           <span class="description-icon icon-lg"></span>
                              <h3>Description</h3>
                        </div>
                        <div class="add-desc-area">
                           <div class="desc">
                              <div class="desc-content">
                                    <p class="u-bottom">
                                       <a class="description-fake-text-area no-box-sizing" href="#">
                                       Add a more detailed description… </a></p>
                              </div>
                           </div>
                        </div>
                     </div>
               </div>
               <div class="task-detail-activity window-module">
                  <div class="window-module-title">
                     <span class="activity-icon icon-lg"></span>
                     <h3>Activity</h3>
                     <div class="window-module-title-options">
                        <a class="show-details-btn" href="#">Show details</a>
                        <a class="hide-details-btn" href="#">Hide details</a>
                     </div>
                  </div>
               </div>
               <!-- <div class="new-comment-section">
                  <div class="member">
                     <span>Avatar</span>
                  </div>
                  <form>
                     <div class="comment-frame">
                        <div class="comment-box">
                           <textarea  class="comment-box-input" aria-label="Write a comment" placeholder="Write a comment…" dir="auto"></textarea>
                        </div>
                     </div>
                  </form>
               </div> -->
            </div>
            <div class="window-sidebar no-box-sizing">
               <div v-if="!showSuggested" class="window-module suggested-actions-module">
                  <div class="suggested-actions-settings">
                     <span class="settings-icon icon-sm"></span>
                  </div>
                  <h3>Suggested</h3>
                  <div class="clearfix">
                     <a @click="joinTask" class="button-link" title="Join" href="#">
                        <span class="icon-sm icon-member"></span>
                        <span class="sidebar-action-text">Join</span>
                     </a>
                  </div>
               </div>
               <div class="window-module clearfix">
                  <h3>Add to card</h3>
                  <div>
                     <a data-cmp="members" class="button-link" title="Members" @click="toggleList">
                        <span class="icon-sm icon-member"></span>
                        <span class="sidebar-action-text">Members</span>
                     </a>
                     <a class="button-link" title="Labels">
                        <span class="icon-sm icon-label"></span>
                        <span class="sidebar-action-text">Labels</span>
                     </a>
                     <a class="button-link" title="Checklist">
                        <span class="icon-sm icon-checklist"></span>
                        <span class="sidebar-action-text">Checklist</span>
                     </a>
                     <a class="button-link" title="Dates">
                        <span class="icon-sm">
                           <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="ScheduleIcon"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Dates</span>  
                     </a>
                     <a class="button-link" title="Attachment">
                         <span class="icon-sm icon-attachment"></span>
                        <span class="sidebar-action-text">Attachment</span>
                     </a>
                     <a class="button-link" title="Location">
                        <span class="icon-sm icon-location"></span>
                        <span class="sidebar-action-text">Location</span>
                     </a>
                     <a v-if="!isCoverBgc" class="button-link" href="#" title="Cover">
                        <span class="icon-sm icon-cover"></span>
                        <span class="sidebar-action-text">Cover</span>
                     </a>
                     <!-- <a class="button-link" href="#" title="Custom Fields">
                        <span class="icon-sm">

                        </span>
                        <span class="sidebar-action-text">Custom Fields</span>
                     </a> -->
                  </div>
                  
               </div>
               <!-- UnDone features -->
               <!-- <div class="powerups-buttons">
                  <div class="window-module clearfix">
                     <h3 class="no-top-margin">Power-Ups</h3>
                     <div>
                        <a class="button-link add-button-link" href="#" title="Add Power-Ups">
                            <span class="add-task-plus-icon icon-sm">
                              <img src="@/assets/img/plus-icon.svg" />
                           </span>
                           Add Power-Ups
                        </a>
                     </div>
                  </div>
               </div> -->
               <!-- <div class="automation-buttons">
                   <div class="window-module">
                      <div class="automation-title">
                        <h3 class="no-top-margin">Automation</h3>
                        <a class="button-link" href="#" role="button">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 50 50" width="16px" height="16px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"/></svg>
                        </a>
                      </div>
                     <div>
                        <a class="button-link add-button-link" href="#" title="Add button">
                           <span class="add-task-plus-icon icon-sm">
                              <img src="@/assets/img/plus-icon.svg" />
                           </span>
                           Add button
                        </a>
                     </div>
                  </div>
               </div> -->
               <div class="window-module clearfix action-buttons">
                  <h3 class="no-top-margin">Actions</h3>
                  <div class="clearfix">
                      <a class="button-link" title="Move" href="#">
                           <span class="icon-sm move-icon"></span>
                           <span class="sidebar-action-text">Move</span>
                        </a>
                      <a class="button-link" title="Copy" href="#">
                           <span class="icon-sm copy-icon"></span>
                           <span class="sidebar-action-text">Copy</span>
                        </a>
                      <!-- <a class="button-link" title="Make template" href="#">
                           <span class="icon-sm">
                           </span>
                           <span class="sidebar-action-text">Make template</span>
                        </a> -->
                      <a class="button-link" title="Watch the card to get notifications when something changes." href="#">
                           <span class="icon-sm watch-icon"></span>
                           <span class="sidebar-action-text">Watch</span>
                        </a>
                        <hr>
                      <a class="button-link" title="Archive" href="#">
                           <span class="icon-sm archive-icon"></span>
                           <span class="sidebar-action-text">Archive</span>
                        </a>
                      <a class="button-link" title="Share" href="#">
                           <span class="icon-sm share-icon"></span>
                           <span class="sidebar-action-text">Share</span>
                        </a>
                  </div>
               </div>
            </div>
			</div>
         </div>
		</div>
      <task-opts-list v-if="isListOpen" :info="info"
            @removeMember="removeTaskMember"
            @addMember="addTaskMember"
            @toggleList="toggleList"
            />
	</div>
</template>

<script>
import Avatar from 'vue-avatar'
import miniProfile from './user-mini-profile'
import taskOptsList from './task-opts-list'

export default {
   name:'task-details',
   components: {
		Avatar,
      miniProfile,
      taskOptsList
	},
   data(){
      return{
         task:null,
         groupTitle:'',
         loggedInUser:null,
         profileOfUser:null,
         isMiniProfileOpen:false,
         modalPos:{},
         isListOpen:false,
         info:{
            type:null,
            task:this.task,
            groupId:null,
            modalPos:{},
         }
      }
   },
    created(){
      const {taskId} = this.$route.params
      const {groupId} = this.$route.params
      this.getTask(taskId)
      this.info.groupId = groupId
      this.info.task = this.task
      this.loggedInUser=this.$store.getters.currLoggedUser
   },
   methods: {
      closemodal(){
         this.$router.go(-1)
      },
      toggleMiniProfile(ev,user){
         try{
            const {left, top} = ev.target.offsetParent.getBoundingClientRect()
            this.modalPos.left = Math.ceil(left)
            this.modalPos.top = Math.ceil(top)
            this.profileOfUser = user
            this.isListOpen = false
            this.isMiniProfileOpen = true
         }catch(err){
            console.log(err)
         }
      },
      closeMiniProfile(){
         try{
            this.profileOfUser = null
            this.isMiniProfileOpen = false
         }catch(err){
            console.log(err)
         }
      },
      toggleList(ev){
         // const {top,right} = ev.target.offsetParent.getBoundingClientRect()
         // this.info.modalPos.top = Math.ceil(top)
         if(this.isListOpen){
            this.isListOpen = !this.isListOpen
         }else{
            this.isMiniProfileOpen = false
            this.isListOpen = true
            this.info.type = 'members-list'
         }
      },
      getTask(taskId){
         try{
            const currBoard = this.$store.getters.currBoard
            currBoard.groups.forEach(group=>group.tasks.find(task=>{
            if(task.id === taskId){
               this.task = task
               this.groupTitle = group.title
            }
            }))
         }catch(err){
            console.log(err)
         }
      },
      joinTask(){
         try{
            const task = this.task
            const {groupId} = this.$route.params
            const user = this.loggedInUser
            const memberIdx = this.task.members.findIndex(member => member._id === user._id)
            if (memberIdx !== -1) {
               return 
            } else {
               if(user) this.task.members.push(user)
               this.$store.dispatch({ type: 'addTaskMember', task,groupId,user})
            }
         }catch(err){
            console.log(err)
         }
      },
      addTaskMember(user){
         try{
            const task = this.task
            const {groupId} = this.$route.params
            const memberIdx = this.task.members.findIndex(member => member._id === user._id)
            if (memberIdx !== -1) {
               return
            } else {
               if(user) this.task.members.push(user)
               this.$store.dispatch({ type: 'addTaskMember', task,groupId,user})
            }
         }catch(err){
            console.log(err)
         }

      },
      removeTaskMember(user){
         try{
            const task = this.task
            const {groupId} = this.$route.params
            const memberIdx = this.task.members.findIndex(member => member._id === user._id)
            if (memberIdx !== -1) {
               if(user) this.task.members.splice(memberIdx,1)
               this.$store.dispatch({ type: 'removeTaskMember', task,groupId,user})
            } else {
               return
            }
         }catch(err){
            console.log(err)
         }
      }
   },
   computed: {
      isCoverBgc() {
         if (this.task.style.bgColor !== '#ffffff') return true
      },
      isHeight() {
         if (this.task.style.bgColor !== '#ffffff') return 32
         else return 0
      },
      dateToShow(){
         if (this.task.startDate.date && this.task.dueDate.date) {
            const from = this.task.startDate.date.slice(0, 6)
            const to = this.task.dueDate.date.slice(0, 6)
            return `${from} - ${to}`
         }else if (this.task.startDate) return this.task.startDate.date.slice(0, 6)
         return this.task.dueDate.date.slice(0, 6)
      },
      showSuggested(){
         const loggedInUserId = this.loggedInUser._id
         var isShowSuggest = false
         this.task.members.forEach(member=>{
            if(member._id===loggedInUserId){
               isShowSuggest = true
            }
         } )
         return isShowSuggest
      },
      getModalPos(){
         return this.modalPos
      }
   },
}
</script>
