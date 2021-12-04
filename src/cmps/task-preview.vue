<template>
   <!-- <section class="list-card-preview"> -->
   <router-link
      class="list-card"
      :to="`/board/${board._id}/${group.id}/${task.id}`"
   >
      <!-- cover -->
      <div
         v-if="isCoverBgc"
         class="list-card-cover"
         :style="{
            backgroundColor: task.style.bgColor,
            height: isHeight + 'px',
         }"
      >
         <span class="icon-edit list-card-operation">
            <img
               class="icon-sm"
               :src="require(`@/assets/img/edit-pencil2.svg`)"
            />
         </span>
      </div>

      <!-- pencil-edit -->
      <div v-if="!isCoverBgc" class="list-card-cover">
         <span class="icon-edit list-card-operation">
            <img
               class="icon-sm"
               :src="require(`@/assets/img/edit-pencil2.svg`)"
            />
         </span>
      </div>
      <!-- list-card-details -->
      <div class="list-card-details">
         <div v-if="task.labels && task.labels.length" class="list-card-labels">
            <span
               v-for="label in task.labels"
               :key="label.id"
               class="card-label"
               :style="{ backgroundColor: label.color }"
            >
               <span class="label-text">{{ label.title }}</span>
            </span>
         </div>
         <div class="list-card-title">
            <span class="task-id hide">{{ task.id }}</span>
            <span>{{ task.title }}</span>
         </div>

         <!-- badges -->
         <div class="badges">
            <span class="js-badges">
               <div class="badge" title="You are watching this card.">
                  <img
                     class="badge-icon icon-xs subscribe"
                     :src="require(`@/assets/img/eye.svg`)"
                  />
               </div>
               <div
                  class="badge is-due-soon"
                  title="This card is due in less than twenty-four hours."
               >
                  <span>
                     <img
                        :src="require(`@/assets/img/clock.svg`)"
                        class="badge-icon icon-xs icon-clock badge-due-icon"
                     />
                     <span class="badge-text js-due-date-text"> Dec 5 </span>
                  </span>
               </div>
               <div
                  class="badge is-icon-only"
                  title="This card has a description."
               >
                  <img
                     class="badge-icon icon-sm icon-description"
                     :src="require(`@/assets/img/menu2.svg`)"
                  />
               </div>
               <div class="badge" title="Comments">
                  <img
                     :src="require(`@/assets/img/comment.svg`)"
                     class="badge-icon icon-sm icon-comment"
                  />
                  <span class="badge-text">2</span>
               </div>
               <div class="badge" title="Attachments">
                  <img
                     :src="require(`@/assets/img/attachment.svg`)"
                     class="badge-icon icon-sm icon-attachment"
                  />
                  <span class="badge-text">1</span>
               </div>
               <div class="badge" title="This card has a location.">
                  <img
                     :src="require(`@/assets/img/location2.svg`)"
                     class="badge-icon icon-sm icon-location"
                  />
               </div>
            </span>
         </div>

         <!-- task-members -->
         <div class="list-card-members">
            <div
               class="member js-member-on-card-menu"
               data-idmem="61a200e0c355862844492eb6"
            >
               <img
                  class="member-avatar"
                  height="30"
                  width="30"
                  src="https://trello-members.s3.amazonaws.com/61a200e0c355862844492eb6/94ce8ada2667013e214ce0c3bdcf0997/30.png"
                  srcset="
                     https://trello-members.s3.amazonaws.com/61a200e0c355862844492eb6/94ce8ada2667013e214ce0c3bdcf0997/30.png 1x,
                     https://trello-members.s3.amazonaws.com/61a200e0c355862844492eb6/94ce8ada2667013e214ce0c3bdcf0997/50.png 2x
                  "
                  alt="נועה ניסים (noanissim7)"
                  title="נועה ניסים (noanissim7)"
               />
            </div>
         </div>
      </div>
   </router-link>
   <!-- </section> -->
</template>

<script>
export default {
   props: ['task', 'group', 'board'],
   components: {

   },
   data() {
      return {

      }
   },
   created() {

   },
   methods: {

   },
   computed: {
      isCoverBgc() {
         if (this.task.style.bgColor !== '#ffffff') return true
      },
      isHeight() {
         if (this.task.style.bgColor !== '#ffffff') return 32
         return 0
      },
      taskBadges() {
         let badges = []
         //we need to check here if yhe curr user is connected
         //and he is one of the task members

      }
   },
}
</script>

