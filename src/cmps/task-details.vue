<template>
	<div class="window-overlay" @click.prevent.self="closemodal()">
		<div class="window">
			<div class="window-wrapper">
				<a @click="closemodal()" class="dialog-close-button">
					<img src="@/assets/img/close-icon.svg" />
				</a>
				<div class="task-detail clearfix">
					<div class="task-cover">
						<div class="task-cover-menu">
							<a class="task-cover-menu-button">
                        <span class="icon-sm cover-menu-btn-icon">
                           <svg width="16px" height="16px" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="VideoLabelIcon">
                              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path>
                           </svg>
                        </span>
                     Cover
							</a>
						</div> 
				</div>
            <div class="window-header">
               <span class="window-header-icon icon-lg">
                  <svg focusable="false" stroke-width="0" viewBox="0 0 24 24" height="24px" width="24px" aria-hidden="true" data-testid="VideoLabelIcon"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path></svg>
               </span>
               <div class="window-title">
                 <textarea class="task-detail-title-input" dir="auto"></textarea>
               </div>
               <div class="window-header-inline-content">
                  <p class="u-bottom">in list
                     <a href="#">In progress or w/e</a>
                  </p>
               </div>
            </div>
            <div class="window-main-col no-box-sizing">
               <div class="task-detail-data clearfix hide">
                  <div class="task-detail-item">
                     <h3 class="task-detail-item-header">List</h3>
                     <div class="task-detail-list-badge">
                        <button class="task-detail-list-badge-btn badge-button button-link">
                        </button>
                     </div>
                  </div>
                  <div class="task-detail-item clearfix">
                     <h3 class="task-detail-item-header">Members</h3>
                     <div class="task-detail-members-list">
                        <a class="task-detail-add-button">
                           <span class="add-btn-icon">
                              <img src="@/assets/img/plus-icon.svg"/>
                           </span>
                        </a>
                     </div>
                  </div>
                  <div class="task-detail-item clearfix">
                     <h3 class="task-detail-item-header">Labels</h3>
                     <div class="task-detail-labels-list">
                        <a class="task-detail-add-button">
                           <span class="add-btn-icon">
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
                        <span class="due-date-complete-icon">
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
                              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></svg>
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
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path></svg>
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
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path></svg>
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
                           <svg width="16" height="16" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z"></path><circle cx="6.5" cy="6.5" r="1.5"></circle></svg>
                        </span>
                        <span class="sidebar-action-text">Labels</span>
                     </a>
                     <a class="button-link" href="#" title="Checklist">
                        <span class="icon-sm">
                           <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Checklist</span>
                     </a>
                     <a class="button-link" href="#" title="Dates">
                        <span class="icon-sm">
                           <svg width="16" height="16" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="ScheduleIcon"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Dates</span>  
                     </a>
                     <a class="button-link" href="#" title="Attachment">
                         <span class="icon-sm">
                           <svg width="16" height="16" stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Attachment</span>
                     </a>
                     <a class="button-link" href="#" title="Location">
                        <span class="icon-sm">
                           <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 395.71 395.71" style="enable-background:new 0 0 395.71 395.71;" xml:space="preserve"><path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738   c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388   C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191   c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/></svg>
                        </span>
                        <span class="sidebar-action-text">Location</span>
                     </a>
                     <a class="button-link" href="#" title="Cover">
                        <span class="icon-sm">
                            <svg width="16" height="16" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="VideoLabelIcon"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path></svg>
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
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="16px" height="16px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"/></svg>
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
                              <svg focusable="false" width="16px" height="16px" viewBox="0 0 24 24" aria-hidden="true" data-testid="ArrowForwardIcon"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                           </span>
                           <span class="sidebar-action-text">Move</span>
                        </a>
                      <a class="button-link" title="Copy" href="#">
                           <span class="icon-sm">
                              <svg width="16px" height="16px" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
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
                              <svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 122.88 65.06" style="enable-background:new 0 0 122.88 65.06" xml:space="preserve"><g><path d="M0.95,30.01c2.92-3.53,5.98-6.74,9.15-9.63C24.44,7.33,41.46,0.36,59.01,0.01c17.51-0.35,35.47,5.9,51.7,19.29 c3.88,3.2,7.63,6.77,11.24,10.74c1.16,1.28,1.22,3.17,0.23,4.51c-4.13,5.83-8.88,10.82-14.07,14.96 C95.12,59.88,79.34,64.98,63.35,65.06c-15.93,0.07-32.06-4.86-45.8-14.57c-6.14-4.34-11.81-9.63-16.78-15.85 C-0.34,33.24-0.23,31.27,0.95,30.01L0.95,30.01z M61.44,26.46c0.59,0,1.17,0.09,1.71,0.24c-0.46,0.5-0.73,1.17-0.73,1.9 c0,1.56,1.26,2.82,2.82,2.82c0.77,0,1.46-0.3,1.97-0.8c0.2,0.6,0.3,1.24,0.3,1.9c0,3.35-2.72,6.07-6.07,6.07 c-3.35,0-6.07-2.72-6.07-6.07C55.37,29.18,58.09,26.46,61.44,26.46L61.44,26.46z M61.44,10.82c5.99,0,11.42,2.43,15.35,6.36 c3.93,3.93,6.36,9.35,6.36,15.35c0,5.99-2.43,11.42-6.36,15.35c-3.93,3.93-9.35,6.36-15.35,6.36c-5.99,0-11.42-2.43-15.35-6.36 c-3.93-3.93-6.36-9.35-6.36-15.35c0-5.99,2.43-11.42,6.36-15.35C50.02,13.25,55.45,10.82,61.44,10.82L61.44,10.82z M71.89,22.08 c-2.67-2.67-6.37-4.33-10.45-4.33c-4.08,0-7.78,1.65-10.45,4.33c-2.67,2.67-4.33,6.37-4.33,10.45c0,4.08,1.65,7.78,4.33,10.45 c2.67,2.67,6.37,4.33,10.45,4.33c4.08,0,7.78-1.65,10.45-4.33c2.67-2.67,4.33-6.37,4.33-10.45C76.22,28.45,74.56,24.75,71.89,22.08 L71.89,22.08z M14.89,25.63c-2.32,2.11-4.56,4.39-6.7,6.82c4.07,4.72,8.6,8.8,13.45,12.23c12.54,8.85,27.21,13.35,41.69,13.29 c14.42-0.07,28.65-4.67,40.37-14.02c4-3.19,7.7-6.94,11.03-11.25c-2.79-2.91-5.63-5.54-8.51-7.92C91.33,12.51,75,6.79,59.15,7.1 C43.34,7.42,27.93,13.76,14.89,25.63L14.89,25.63z"/></g></svg>
                           </span>
                           <span class="sidebar-action-text">Watch</span>
                        </a>
                        <hr>
                      <a class="button-link" title="Archive" href="#">
                           <span class="icon-sm">
                              <svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 459.489 459.489" style="enable-background:new 0 0 459.489 459.489;" xml:space="preserve"><g><g><g><path d="M406.619,132.325H52.87c-8.284,0-15,6.716-15,15v286.513c0,8.284,6.716,15,15,15h353.749c8.284,0,15-6.716,15-15V147.325     C421.619,139.041,414.903,132.325,406.619,132.325z M391.619,418.838H67.87V162.325h323.749V418.838z"/><path d="M444.489,10.651H15c-8.284,0-15,6.716-15,15v60.225c0,8.284,6.716,15,15,15h429.489c8.284,0,15-6.716,15-15V25.651     C459.489,17.367,452.773,10.651,444.489,10.651z M429.489,70.876H30V40.651h399.489V70.876z"/><path d="M177.334,262.173h104.82c8.284,0,15-6.716,15-15v-43.562c0-8.284-6.716-15-15-15h-104.82c-8.284,0-15,6.716-15,15v43.562     C162.334,255.457,169.05,262.173,177.334,262.173z M192.334,218.611h74.82v13.562h-74.82V218.611z"/></g></g></g></svg>
                           </span>
                           <span class="sidebar-action-text">Archive</span>
                        </a>
                      <a class="button-link" title="Share" href="#">
                           <span class="icon-sm">
                              <svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6000 3900" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M713 1152c197 0 375 80 504 209 29 29 56 61 80 95l1125-468c-36-85-55-178-55-275 0-197 80-375 209-504S2883 0 3080 0s375 80 504 209 209 307 209 504-80 375-209 504-307 209-504 209-375-80-504-209c-22-22-43-46-62-71l-1132 471c29 77 45 161 45 248 0 54-6 106-17 157l1131 530c11-13 23-26 36-39 129-129 307-209 504-209s375 80 504 209 209 307 209 504-80 375-209 504-307 209-504 209-375-80-504-209-209-307-209-504c0-112 26-219 73-313l-1092-512c-34 66-78 126-130 177-129 129-307 209-504 209s-375-80-504-209S2 2062 2 1865s80-375 209-504 307-209 504-209zm2742-815c-96-96-229-156-376-156s-280 60-376 156-156 229-156 376 60 280 156 376 229 156 376 156 280-60 376-156 156-229 156-376-60-280-156-376zm0 2303c-96-96-229-156-376-156s-280 60-376 156-156 229-156 376 60 280 156 376 229 156 376 156 280-60 376-156 156-229 156-376-60-280-156-376zM1089 1488c-96-96-229-156-376-156s-280 60-376 156-156 229-156 376 60 280 156 376 229 156 376 156 280-60 376-156 156-229 156-376-60-280-156-376z" fill-rule="nonzero"/></svg>
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
export default {
   name:"task-details",
   methods: {
      closemodal(){
         this.$router.go(-1)
      },
   }
}
</script>
