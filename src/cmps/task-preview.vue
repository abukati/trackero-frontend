<template>
   <!-- <section class="list-card-preview"> -->
   <router-link
      class="list-card"
      :to="`/board/${board._id}/${group.id}/${task.id}`"
   >
      <div></div>
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
            <!-- <img
               class="icon-xs"
               :src="require(`@/assets/img/edit-pencil2.svg`)"
            /> -->
            <svg
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               enable-background="new 0 0 512 512"
               width="14px"
               height="14px"
            >
               <g>
                  <g>
                     <path
                        fill="currentColor"
                        d="m179.2,410.4l-77.3-77.4 272.5-272.9 77.3,77.4-272.5,272.9zm-96-38.3l56.9,57-79.2,22.3 22.3-79.3zm411.8-249l-106.2-106.4c-7.7-7.7-21.2-7.7-28.9-3.55271e-15l-301.3,301.8c-2.5,2.5-4.3,5.5-5.2,8.9l-41.6,148c-2,7.1 0,14.8 5.2,20 3.9,3.9 11.7,6.7 20,5.2l147.8-41.7c3.4-0.9 6.4-2.7 8.9-5.2l301.3-301.7c8-8 8-20.9 0-28.9z"
                     />
                  </g>
               </g>
            </svg>
         </span>
      </div>

      <!-- pencil-edit -->
      <div v-if="!isCoverBgc" class="list-card-edit-pencil">
         <span class="icon-sm icon-edit list-card-operation">
            <!-- <img
               class="icon-xs"
               :src="require(`@/assets/img/edit-pencil2.svg`)"
            /> -->
            <svg
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               enable-background="new 0 0 512 512"
               width="14px"
               height="14px"
            >
               <g>
                  <g>
                     <path
                        fill="currentColor"
                        d="m179.2,410.4l-77.3-77.4 272.5-272.9 77.3,77.4-272.5,272.9zm-96-38.3l56.9,57-79.2,22.3 22.3-79.3zm411.8-249l-106.2-106.4c-7.7-7.7-21.2-7.7-28.9-3.55271e-15l-301.3,301.8c-2.5,2.5-4.3,5.5-5.2,8.9l-41.6,148c-2,7.1 0,14.8 5.2,20 3.9,3.9 11.7,6.7 20,5.2l147.8-41.7c3.4-0.9 6.4-2.7 8.9-5.2l301.3-301.7c8-8 8-20.9 0-28.9z"
                     />
                  </g>
               </g>
            </svg>
         </span>
      </div>

      <!-- list-card-details -->
      <div class="list-card-details">
         <div v-if="task.labels && task.labels.length" class="list-card-labels">
            <span
               v-for="label in task.labels"
               :key="label.id"
               class="card-label"
               :style="{
                  backgroundColor: label.color,
                  height: labelsHeight + 'px',
               }"
               @click.prevent="toggleLabels"
            >
               <span v-if="board.isLabelsShown" class="label-text">{{
                  label.title
               }}</span>
            </span>
         </div>
         <div class="list-card-title">
            <span class="task-id hide">{{ task.id }}</span>
            <span>{{ task.title }}</span>
         </div>

         <!-- badges -->
         <div class="badges">
            <span class="js-badges">
               <div
                  v-if="isWatchingBadge"
                  class="badge"
                  title="You are watching this card."
               >
                  <!-- <img
                     class="badge-icon icon-xs subscribe"
                     :src="require(`@/assets/img/eye.svg`)"
                  /> -->
                  <svg
                     version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     enable-background="new 0 0 512 512"
                     width="16px"
                     height="16px"
                  >
                     <g>
                        <path
                           fill="currentColor"
                           d="m496.4,243.1c-63.9-78.7-149.3-122.1-240.4-122.1-91.1,0-176.5,43.4-240.4,122.1-6.1,7.5-6.1,18.2 0,25.7 63.9,78.8 149.3,122.2 240.4,122.2 91.1,0 176.5-43.4 240.4-122.1 6.1-7.5 6.1-18.3 0-25.8zm-240.4,79.8c-36.9,0-66.9-30-66.9-66.9 0-36.9 30-66.9 66.9-66.9 36.9,0 66.9,30 66.9,66.9 0,36.9-30,66.9-66.9,66.9zm-197.8-66.9c37.8-42.2 82.9-71.1 131.5-84.9-25.2,19.7-41.5,50.4-41.5,84.9 0,34.4 16.2,65.1 41.5,84.9-48.6-13.8-93.6-42.7-131.5-84.9zm264.1,84.9c25.2-19.7 41.5-50.4 41.5-84.9 0-34.4-16.2-65.1-41.5-84.9 48.6,13.8 93.7,42.7 131.5,84.9-37.9,42.2-82.9,71.1-131.5,84.9z"
                        />
                     </g>
                  </svg>
               </div>
               <div
                  v-if="isDatesBadge"
                  class="badge is-due-soon"
                  title="This card is due in less than twenty-four hours."
               >
                  <span class="is-due-soon-span">
                     <!-- <img
                        :src="require(`@/assets/img/clock.svg`)"
                        class="badge-icon icon-xs icon-clock badge-due-icon"
                     /> -->
                     <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 300.988 300.988"
                        style="enable-background: new 0 0 300.988 300.988"
                        xml:space="preserve"
                        width="16px"
                        height="16px"
                     >
                        <g>
                           <g>
                              <path
                                 fill="currentColor"
                                 stroke="currentColor"
                                 d="M150.494,0.001C67.511,0.001,0,67.512,0,150.495s67.511,150.493,150.494,150.493s150.494-67.511,150.494-150.493
			S233.476,0.001,150.494,0.001z M150.494,285.987C75.782,285.987,15,225.206,15,150.495S75.782,15.001,150.494,15.001
			s135.494,60.782,135.494,135.493S225.205,285.987,150.494,285.987z"
                              />
                              <polygon
                                 fill="currentColor"
                                 points="142.994,142.995 83.148,142.995 83.148,157.995 157.994,157.995 157.994,43.883 142.994,43.883 		"
                              />
                           </g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                           <g></g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                     </svg>
                     <span class="badge-text js-due-date-text">
                        {{ organizedDates }}
                     </span>
                  </span>
               </div>
               <div
                  v-if="task.description"
                  class="badge is-icon-only"
                  title="This card has a description."
               >
                  <!-- <img
                     class="badge-icon icon-sm icon-description"
                     :src="require(`@/assets/img/menu2.svg`)"
                  /> -->
                  <svg
                     version="1.1"
                     id="Capa_1"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     x="0px"
                     y="0px"
                     viewBox="0 0 384.97 384.97"
                     style="enable-background: new 0 0 384.97 384.97"
                     xml:space="preserve"
                     width="16px"
                     height="16px"
                  >
                     <g>
                        <g id="Menu">
                           <path
                              fill="currentColor"
                              d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03
			C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z"
                           />
                           <path
                              fill="currentColor"
                              d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03
			S379.58,180.455,372.939,180.455z"
                           />
                           <path
                              fill="currentColor"
                              d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909
			c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z"
                           />
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                     </g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                  </svg>
               </div>
               <div
                  v-if="task.comments && task.comments.length"
                  class="badge"
                  title="Comments"
               >
                  <!-- <img
                     :src="require(`@/assets/img/comment.svg`)"
                     class="badge-icon icon-sm icon-comment"
                  /> -->
                  <svg
                     viewBox="0 0 24 24"
                     version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     width="16px"
                     height="16px"
                  >
                     <!-- Uploaded to SVGRepo https://www.svgrepo.com -->
                     <title>ic_fluent_comment_24_regular</title>
                     <desc>Created with Sketch.</desc>
                     <g
                        id="🔍-Product-Icons"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                     >
                        <g
                           id="ic_fluent_comment_24_regular"
                           fill="#212121"
                           fill-rule="nonzero"
                        >
                           <path
                              fill="currentColor"
                              d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"
                              id="🎨-Color"
                           ></path>
                        </g>
                     </g>
                  </svg>
                  <span class="badge-text">{{ task.comments.length }}</span>
               </div>
               <div
                  v-if="task.attachments && task.attachments.length"
                  class="badge"
                  title="Attachments"
               >
                  <!-- <img
                     :src="require(`@/assets/img/attachment.svg`)"
                     class="badge-icon icon-sm icon-attachment"
                  /> -->
                  <svg
                     width="16px"
                     height="16px"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M19.463 5.576c-.688-.75-1.929-.796-2.756.031l-8.1 8.1c-.21.21-.21.476 0 .686.21.21.476.21.686 0l6.7-6.7a1 1 0 0 1 1.414 1.414l-6.7 6.7a2.45 2.45 0 0 1-3.514 0 2.45 2.45 0 0 1 0-3.514l8.1-8.1c1.567-1.568 4.115-1.619 5.63.015 1.552 1.569 1.597 4.104-.03 5.613l-9.486 9.486c-2.19 2.19-5.624 2.19-7.814 0-2.19-2.19-2.19-5.624 0-7.814l8.1-8.1a1 1 0 0 1 1.414 1.414l-8.1 8.1c-1.41 1.41-1.41 3.576 0 4.986 1.41 1.41 3.576 1.41 4.986 0l9.5-9.5.031-.03c.75-.687.796-1.929-.031-2.756l-.03-.031z"
                        fill="currentColor"
                     />
                  </svg>

                  <span class="badge-text">{{ task.attachments.length }}</span>
               </div>
               <div
                  v-if="task.location.id"
                  class="badge"
                  title="This card has a location."
               >
                  <!-- <img
                     :src="require(`@/assets/img/location2.svg`)"
                     class="badge-icon icon-sm icon-location"
                  /> -->
                  <svg
                     version="1.1"
                     id="Capa_1"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     x="0px"
                     y="0px"
                     viewBox="0 0 264.018 264.018"
                     style="enable-background: new 0 0 264.018 264.018"
                     xml:space="preserve"
                     width="16px"
                     height="16px"
                  >
                     <g>
                        <path
                           fill="currentColor"
                           d="M132.009,0c-42.66,0-77.366,34.706-77.366,77.366c0,11.634,2.52,22.815,7.488,33.24c0.1,0.223,0.205,0.442,0.317,0.661
		l58.454,113.179c2.146,4.154,6.431,6.764,11.106,6.764c4.676,0,8.961-2.609,11.106-6.764l58.438-113.148
		c0.101-0.195,0.195-0.392,0.285-0.591c5.001-10.455,7.536-21.67,7.536-33.341C209.375,34.706,174.669,0,132.009,0z
		 M132.009,117.861c-22.329,0-40.495-18.166-40.495-40.495c0-22.328,18.166-40.494,40.495-40.494s40.495,18.166,40.495,40.494
		C172.504,99.695,154.338,117.861,132.009,117.861z"
                        />
                        <path
                           fill="#ffffff"
                           d="M161.81,249.018h-59.602c-4.143,0-7.5,3.357-7.5,7.5c0,4.143,3.357,7.5,7.5,7.5h59.602c4.143,0,7.5-3.357,7.5-7.5
		C169.31,252.375,165.952,249.018,161.81,249.018z"
                        />
                     </g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                     <g></g>
                  </svg>
               </div>
            </span>
         </div>

         <!-- task-members -->
         <div
            div
            v-if="task.members && task.members.length"
            class="task-detail-members-list list-card-members"
         >
            <a
               class="member task-detail-member"
               v-for="member in task.members"
               :key="member._id"
            >
               <avatar
                  :size="28"
                  :username="member.fullname"
                  :title="`${member.fullname}(${member.username})`"
               />
            </a>
         </div>
      </div>
   </router-link>
   <!-- </section> -->
</template>

<script>
import Avatar from 'vue-avatar'
export default {
   props: ['task', 'group', 'board'],
   components: {
      Avatar
   },
   data() {
      return {
         labelsAreOpen: true,
         currLoggedUser: null,
      }
   },
   created() {

   },
   methods: {
      toggleLabels() {
         this.board.isLabelsShown = !this.board.isLabelsShown
         this.$store.dispatch({ type: 'updateBoard', board: this.board })
      }
   },
   computed: {
      isCoverBgc() {
         if (this.task.style.bgColor !== '#ffffff') return true
      },
      isHeight() {
         if (this.task.style.bgColor !== '#ffffff') return 32
         return 0
      },
      labelsHeight() {
         if (this.board.isLabelsShown) return 16
         return 8
      },
      isWatchingBadge() {
         this.currLoggedUser = this.$store.getters.currLoggedUser
         const idx = this.task.members.findIndex(member => member._id === this.currLoggedUser._id)
         if (idx !== -1) return true
      },
      isDatesBadge() {
         if (this.task.startDate || this.task.dueDate) return true
      },
      organizedDates() {
         if (this.task.startDate.date && this.task.dueDate.date) {
            const from = this.task.startDate.date.slice(0, 6)
            const to = this.task.dueDate.date.slice(0, 6)
            return `${from}-${to}`
         } else if (this.task.startDate) return this.task.startDate.date.slice(0, 6)
         return this.task.dueDate.date.slice(0, 6)
      }



   },
}
</script>

