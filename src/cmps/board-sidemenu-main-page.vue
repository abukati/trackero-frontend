<template>
   <div>
      <ul class="board-menu-navigation">
         <li class="board-menu-navigation-item">
            <a @click="aboutBoard" class="board-menu-navigation-item-link toggle-about-this-board">
               <span class="board-menu-navigation-item-link-icon icon-lg icon-board"></span>
               &nbsp;About this board
               <div class="board-menu-navigation-item-link-summary board-menu-about-this-board-summary">
                  &nbsp;Add a description to your board
               </div>
            </a>
         </li>
         <li class="board-menu-navigation-item mod-background">
            <a @click="changeBgcMenu" class="board-menu-navigation-item-link change-background">
               <span class="board-menu-navigation-item-link-icon fill-background-preview" :style="{background:board.style.bgColor}"></span>
               &nbsp;Change background
            </a>
         </li>
         <li class="board-menu-navigation-item">
            <a @click="labelsMenu" class="board-menu-navigation-item-link open-labels">
               <span class="icon-label icon-lg board-menu-navigation-item-link-icon"></span>
               &nbsp;Labels
            </a>
         </li>
         <li class="board-menu-navigation-item">
            <a @click="archivedItems" class="board-menu-navigation-item-link open-archive">
               <span class="icon-archive icon-lg board-menu-navigation-item-link-icon"></span>
               &nbsp;Archived items
            </a>
         </li>
         <li @click="moreOptions" class="board-menu-navigation-item">
            <a class="board-menu-navigation-item-link open-more">
               <span class="icon-overflow-menu-horizontal icon-sm board-menu-navigation-item-link-icon"></span>
               &nbsp;More
            </a>
         </li>
      </ul>
      <hr />
      <a @class="fillActivities" class="board-menu-section-header">
         <span class="board-menu-section-header-icon icon-lg icon-activity"></span>
         <span class="board-menu-section-header-title">Activity</span>
         <span class="board-menu-section-header-count unread-activity-count"></span>
      </a>
      <div class="menu-action-list">
         <template v-for="activity in board.activities">
            <div class="menu-activity mod-attachment-type" :key="activity.id">
               <div class="activity-creator">
                  <avatar class="user-avatar" :src="require('@/assets/img/'+activity.byMember.imgUrl)" :size="32" :username="activity.byMember.fullname" :title="`${activity.byMember.fullname}(${activity.byMember.username})`" />
               </div>
               <div class="activity-desc">
                  <span class="inline-member" :data-memId="activity.byMember._id">
                     <span class="u-font-weight-bold">{{ activity.byMember.fullname }}</span>
                  </span>
                  {{ activity.type }}
                  <template v-if="activity.task">
                     <!-- :href="`/board/${board._id}/${activity.task.group.id}/${activity.task.id}`" -->
                     <a >
                        {{ activity.task.title }}
                     </a>
                     {{ activity.to }}
                  </template>
               </div>
               <div class="activity-meta quiet">
                  <!-- :href="`/board/${board._id}/${activity.task.group.id}/${activity.task.id}`" -->
                  <a v-if="activity.task" class="date">
                     timestamplib
                  </a>
                  <span class="date" v-else>timestamplib</span>
               </div>
            </div>
         </template>
      </div>
      <a @click="fillActivities" class="show-more fill-activity-btn">View all activity...</a>
   </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
   name: 'menu-main-page',
   components: {
      Avatar
   },
   props: {
      board: Object, required: true,
      moreOptions: Function, required: true,
   },
   methods: {
      changeBgcMenu() {

      },
      aboutBoard() {

      },
      labelsMenu() {

      },
      archivedItems() {

      },
      fillActivities() {
         
      }
   }
}
</script>

<style>

</style>