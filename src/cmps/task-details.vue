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
                        <span class="icon-sm cover-menu-btn-icon">
                           <svg width="16px" height="16px" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="VideoLabelIcon"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path>
                           </svg>
                        </span>
                     Cover
							</a>
                  </div> 
               </div>
			      <!-- </div> -->
            <div class="window-header">
               <span class="window-header-icon icon-lg">
                  <svg fill="currentColor" focusable="false" stroke-width="0" viewBox="0 0 24 24" height="24px" width="24px" aria-hidden="true" data-testid="VideoLabelIcon"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path></svg>
               </span>
               <div class="window-title">
                  <textarea-autosize class="task-detail-title-input" rows="1" :value="task.title"/>
               </div>
               <div class="window-header-inline-content">
                  <p class="u-bottom">in list <a href="#">{{groupTitle}}</a></p>
               </div>
            </div>
            <div class="window-main-col no-box-sizing">
               <div class="task-detail-data clearfix">
                  <div class="task-detail-item">
                     <h3 class="task-detail-item-header">List</h3>
                     <div class="task-detail-list-badge">
                        <button class="task-detail-list-badge-btn badge-button button-link">
                        </button>
                     </div>
                  </div>
                  <div class="task-detail-item clearfix">
                     <h3 class="task-detail-item-header">Members</h3>
                     <div v-if="task.members && task.members.length" class="task-detail-members-list">
                        <a  class="member task-detail-member" v-for="member in task.members" :key="member._id">
                           <avatar :size="28" :username="member.fullname" :title="`${member.fullname}(${member.username})`" />
                        </a>
                        <a class="task-detail-add-button">
                           <span class="add-btn-icon icon-lg">
                              <img src="@/assets/img/plus-icon.svg"/>
                           </span>
                        </a>
                     </div>
                  </div>
                  <div class="task-detail-item clearfix">
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
                  <div class="task-detail-item">
                     <h3 class="task-detail-item-header">Start date</h3>
                        <div class="start-date-badge">
                           <div></div>
                        </div>
                  </div>
                  <div class="task-detail-item">
                     <h3 class="task-detail-item-header">Due date</h3>
                        <div class="task-detail-due-date-badge">
                           <a class="due-date-complete-box" href="#" role="button">
                              <span class="due-date-complete-icon ">
                                 <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                              </span>
                           </a>
                        </div>
                     <div></div>
                  </div>
                  <div class="task-detail-item">
                     <h3 class="task-detail-item-header">Votes</h3>
                     <a class="task-detail-badge"></a>
                  </div>
                  <div class="task-detail-item">
                     <h3 class="task-detail-item-header">Last updated</h3>
                     <div class="task-detail-badge task-detail-last-updated"></div>
                  </div>
               </div>
               <div class="task-detail-desc">
                     <div class="window-module">
                        <div class="window-module-title">
                           <span class="description-icon icon-lg">
                              <svg focusable="false" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></svg>
                           </span>
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
                     <span class="activity-icon icon-lg">
                        <svg fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path></svg>
                     </span>
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
               <div class="window-module suggested-actions-module">
                  <div class="suggested-actions-settings">
                     <span class="settings-icon icon-sm">
                        <img src="@/assets/img/settings-icon.svg" />
                     </span>
                  </div>
                  <h3>Suggested</h3>
                    <div class="clearfix">
                        <a class="button-link" title="Join" href="#">
                           <span class="icon-sm icon-member">
                              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path></svg>
                           </span>
                           <span class="sidebar-action-text">Join</span>
                        </a>
                     </div>
               </div>
               <div class="window-module clearfix">
                  <h3>Add to card</h3>
                  <div>
                     <a class="button-link" href="#" title="Members">
                        <span class="icon-sm icon-member">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Members</span>
                     </a>
                     <a class="button-link" href="#" title="Labels">
                        <span class="icon-sm">
                           <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z"></path><circle cx="6.5" cy="6.5" r="1.5"></circle></svg>
                        </span>
                        <span class="sidebar-action-text">Labels</span>
                     </a>
                     <a class="button-link" href="#" title="Checklist">
                        <span class="icon-sm">
                           <svg width="16" height="16" fill="currentColor"  focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Checklist</span>
                     </a>
                     <a class="button-link" href="#" title="Dates">
                        <span class="icon-sm">
                           <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="ScheduleIcon"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Dates</span>  
                     </a>
                     <a class="button-link" href="#" title="Attachment">
                         <span class="icon-sm">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.463 5.576c-.688-.75-1.929-.796-2.756.031l-8.1 8.1c-.21.21-.21.476 0 .686.21.21.476.21.686 0l6.7-6.7a1 1 0 0 1 1.414 1.414l-6.7 6.7a2.45 2.45 0 0 1-3.514 0 2.45 2.45 0 0 1 0-3.514l8.1-8.1c1.567-1.568 4.115-1.619 5.63.015 1.552 1.569 1.597 4.104-.03 5.613l-9.486 9.486c-2.19 2.19-5.624 2.19-7.814 0-2.19-2.19-2.19-5.624 0-7.814l8.1-8.1a1 1 0 0 1 1.414 1.414l-8.1 8.1c-1.41 1.41-1.41 3.576 0 4.986 1.41 1.41 3.576 1.41 4.986 0l9.5-9.5.031-.03c.75-.687.796-1.929-.031-2.756l-.03-.031z" fill="#6b778c"/></svg>
                        </span>
                        <span class="sidebar-action-text">Attachment</span>
                     </a>
                     <a class="button-link" href="#" title="Location">
                        <span class="icon-sm">
                           <svg width="16" height="16" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 264.018 264.018" style="enable-background:new 0 0 264.018 264.018;" xml:space="preserve"><g><path  fill="#6b778c" d="M132.009,0c-42.66,0-77.366,34.706-77.366,77.366c0,11.634,2.52,22.815,7.488,33.24c0.1,0.223,0.205,0.442,0.317,0.661 l58.454,113.179c2.146,4.154,6.431,6.764,11.106,6.764c4.676,0,8.961-2.609,11.106-6.764l58.438-113.148 c0.101-0.195,0.195-0.392,0.285-0.591c5.001-10.455,7.536-21.67,7.536-33.341C209.375,34.706,174.669,0,132.009,0z M132.009,117.861c-22.329,0-40.495-18.166-40.495-40.495c0-22.328,18.166-40.494,40.495-40.494s40.495,18.166,40.495,40.494 C172.504,99.695,154.338,117.861,132.009,117.861z"/><path fill="#ffffff"  d="M161.81,249.018h-59.602c-4.143,0-7.5,3.357-7.5,7.5c0,4.143,3.357,7.5,7.5,7.5h59.602c4.143,0,7.5-3.357,7.5-7.5 C169.31,252.375,165.952,249.018,161.81,249.018z"/></g></svg>
                        </span>
                        <span class="sidebar-action-text">Location</span>
                     </a>
                     <a class="button-link" href="#" title="Cover">
                        <span class="icon-sm">
                            <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="VideoLabelIcon"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Cover</span>
                     </a>
                     <a class="button-link" href="#" title="Custom Fields">
                        <span class="icon-sm">

                        </span>
                        <span class="sidebar-action-text">Custom Fields</span>
                     </a>
                  </div>
               </div>
               <div class="powerups-buttons">
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
               </div>
               <div class="automation-buttons">
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
               </div>
               <div class="window-module clearfix action-buttons">
                  <h3 class="no-top-margin">Actions</h3>
                  <div class="clearfix">
                      <a class="button-link" title="Move" href="#">
                           <span class="icon-sm">
                              <svg focusable="false" width="16px" fill="currentColor" height="16px" viewBox="0 0 24 24" aria-hidden="true" data-testid="ArrowForwardIcon"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                           </span>
                           <span class="sidebar-action-text">Move</span>
                        </a>
                      <a class="button-link" title="Copy" href="#">
                           <span class="icon-sm">
                              <svg width="16px" height="16px" fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                           </span>
                           <span class="sidebar-action-text">Copy</span>
                        </a>
                      <a class="button-link" title="Make template" href="#">
                           <span class="icon-sm">
                           </span>
                           <span class="sidebar-action-text">Make template</span>
                        </a>
                      <a class="button-link" title="Watch the card to get notifications when something changes." href="#">
                           <span class="icon-sm">
                              <svg width="16px" height="16px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512"><g><path fill="#5e6c84" d="m496.4,243.1c-63.9-78.7-149.3-122.1-240.4-122.1-91.1,0-176.5,43.4-240.4,122.1-6.1,7.5-6.1,18.2 0,25.7 63.9,78.8 149.3,122.2 240.4,122.2 91.1,0 176.5-43.4 240.4-122.1 6.1-7.5 6.1-18.3 0-25.8zm-240.4,79.8c-36.9,0-66.9-30-66.9-66.9 0-36.9 30-66.9 66.9-66.9 36.9,0 66.9,30 66.9,66.9 0,36.9-30,66.9-66.9,66.9zm-197.8-66.9c37.8-42.2 82.9-71.1 131.5-84.9-25.2,19.7-41.5,50.4-41.5,84.9 0,34.4 16.2,65.1 41.5,84.9-48.6-13.8-93.6-42.7-131.5-84.9zm264.1,84.9c25.2-19.7 41.5-50.4 41.5-84.9 0-34.4-16.2-65.1-41.5-84.9 48.6,13.8 93.7,42.7 131.5,84.9-37.9,42.2-82.9,71.1-131.5,84.9z"/></g></svg>
                           </span>
                           <span class="sidebar-action-text">Watch</span>
                        </a>
                        <hr>
                      <a class="button-link" title="Archive" href="#">
                           <span class="icon-sm">
                              <svg width="16px" height="16px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 459.489 459.489" style="enable-background:new 0 0 459.489 459.489;" xml:space="preserve"><g><g><g><path d="M406.619,132.325H52.87c-8.284,0-15,6.716-15,15v286.513c0,8.284,6.716,15,15,15h353.749c8.284,0,15-6.716,15-15V147.325     C421.619,139.041,414.903,132.325,406.619,132.325z M391.619,418.838H67.87V162.325h323.749V418.838z"/><path d="M444.489,10.651H15c-8.284,0-15,6.716-15,15v60.225c0,8.284,6.716,15,15,15h429.489c8.284,0,15-6.716,15-15V25.651     C459.489,17.367,452.773,10.651,444.489,10.651z M429.489,70.876H30V40.651h399.489V70.876z"/><path d="M177.334,262.173h104.82c8.284,0,15-6.716,15-15v-43.562c0-8.284-6.716-15-15-15h-104.82c-8.284,0-15,6.716-15,15v43.562     C162.334,255.457,169.05,262.173,177.334,262.173z M192.334,218.611h74.82v13.562h-74.82V218.611z"/></g></g></g></svg>
                           </span>
                           <span class="sidebar-action-text">Archive</span>
                        </a>
                      <a class="button-link" title="Share" href="#">
                           <span class="icon-sm">
                              <svg width="16px" height="16px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6000 3900" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M713 1152c197 0 375 80 504 209 29 29 56 61 80 95l1125-468c-36-85-55-178-55-275 0-197 80-375 209-504S2883 0 3080 0s375 80 504 209 209 307 209 504-80 375-209 504-307 209-504 209-375-80-504-209c-22-22-43-46-62-71l-1132 471c29 77 45 161 45 248 0 54-6 106-17 157l1131 530c11-13 23-26 36-39 129-129 307-209 504-209s375 80 504 209 209 307 209 504-80 375-209 504-307 209-504 209-375-80-504-209-209-307-209-504c0-112 26-219 73-313l-1092-512c-34 66-78 126-130 177-129 129-307 209-504 209s-375-80-504-209S2 2062 2 1865s80-375 209-504 307-209 504-209zm2742-815c-96-96-229-156-376-156s-280 60-376 156-156 229-156 376 60 280 156 376 229 156 376 156 280-60 376-156 156-229 156-376-60-280-156-376zm0 2303c-96-96-229-156-376-156s-280 60-376 156-156 229-156 376 60 280 156 376 229 156 376 156 280-60 376-156 156-229 156-376-60-280-156-376zM1089 1488c-96-96-229-156-376-156s-280 60-376 156-156 229-156 376 60 280 156 376 229 156 376 156 280-60 376-156 156-229 156-376-60-280-156-376z" fill-rule="nonzero"/></svg>
                           </span>
                           <span class="sidebar-action-text">Share</span>
                        </a>
                  </div>
               </div>
            </div>
			</div>
         </div>
		</div>
	</div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
   name:'task-details',
   components: {
		Avatar,
	},
   data(){
      return{
         task:null,
         groupTitle:''
      }
   },
    created(){
      const {taskId} = this.$route.params
      this.getTask(taskId)
   },
   methods: {
      closemodal(){
         this.$router.go(-1)
      },
      getTask(taskId){
         const currBoard = this.$store.getters.currBoard
         currBoard.groups.forEach(group=>group.tasks.find(task=>{
            if(task.id === taskId){
               this.task = task
               this.groupTitle = group.title
            }
            }))
      },
   },
   computed: {
      isCoverBgc() {
         if (this.task.style.bgColor !== '#ffffff') return true
      },
      isHeight() {
         if (this.task.style.bgColor !== '#ffffff') return 32
         else return 0
      },
   },
}
</script>
