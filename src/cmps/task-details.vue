<template>
	<div class="window-overlay">
		<div class="window">
			<div class="window-wrapper">
				<a class="dialog-close-button" href="#">
					<img src="@/assets/img/close-icon.svg" />
				</a>
				<div class="task-detail">
					<div class="task-cover hide">
                  <!-- Unused div -->
						<div class="task-cover-stickers "></div>
						<div class="task-cover-menu ">
							<a class="task-cover-menu-button">
                        <span class="icon-sm cover-menu-btn-icon">
                           <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="VideoLabelIcon">
                              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path>
                           </svg>
                        </span>
                     Cover
							</a>
						</div> 
				</div>
            <div class="window-header">
               <span class="icon-lg window-header-icon">
               </span>
               <div class="window-title">
                 <textarea class="task-detail-title-input"></textarea>
               </div>
               <div class="window-header-inline-content">
                  <p class="u-bottom">in list
                     <a href="#">In progress or w/e</a>
                  </p>
               </div>
            </div>
            <div class="window-main-col">
               <div class="task-detail-data">
                  <div class="task-detail-item">
                     <h3 class="task-detail-item-header">List</h3>
                     <div class="task-detail-list-badge">
                        <button class="task-detail-list-badge-btn badge-button button-link">
                        </button>
                     </div>
                  </div>
                  <div class="task-detail-item">
                     <h3 class="task-detail-item-header">Members</h3>
                     <div class="task-detail-members-list">
                        <a class="task-detail-add-button">
                           <span class="add-btn-icon">
                              <img src="@/assets/img/plus-icon.svg"/>
                           </span>
                        </a>
                     </div>
                  </div>
                  <div class="task-detail-item">
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
                  <div>
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
                                       <a class="description-fake-text-area" href="#">
                                       Add a more detailed description… </a></p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="window-sidebar">
               <div class="window-module suggested-actions-module">
                  <div class="suggested-actions-settings">
                     <span class="icon-sm">
                        <img src="@/assets/img/settings-icon.svg" />
                     </span>
                  </div>
                  <h3>Suggested</h3>
                    <div>
                        <a class="button-link" title="Join" href="#">
                           <span class="icon-sm icon-member">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path></svg>
                           </span>
                           <span class="sidebar-action-text">Join</span>
                        </a>
                     </div>
               </div>
               <div class="window-module">
                  <h3>Add to card</h3>
                  <div>
                     <a class="button-link" href="#">
                        <span class="icon-sm icon-member">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Members</span>
                     </a>
                     <a class="button-link" href="#">
                        <span class="icon-sm">
                           <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Checklist</span>
                     </a>
                     <a class="button-link" href="#">
                        <span class="icon-sm">
                           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm8-7A8 8 0 110 8a8 8 0 0116 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" clip-rule="evenodd"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Dates</span>  
                     </a>
                     <a class="button-link" href="#">
                         <span class="icon-sm">
                           <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Attachment</span>
                     </a>
                     <a class="button-link" href="#">
                        <span class="icon-sm">
                           
                        </span>
                        <span class="sidebar-action-text">Location</span>
                     </a>
                     <a class="button-link" href="#">
                        <span class="icon-sm">
                            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="VideoLabelIcon"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path></svg>
                        </span>
                        <span class="sidebar-action-text">Cover</span>
                     </a>
                     <a class="button-link" href="#">
                        <span class="icon-sm">

                        </span>
                        <span class="sidebar-action-text">Custom Fields</span>
                     </a>
                  </div>
               </div>
               <div class="powerups-buttons">
                  <div class="window-module">
                     <h3>Power-Ups</h3>
                     <div>
                        <a class="button-link" href="#" title="Add Power-Ups">
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
                     <h3>Automation</h3>
                     <div>
                        <a class="button-link" href="#" title="Add Power-Ups">
                            <span class="add-task-plus-icon icon-sm">
                              <img src="@/assets/img/plus-icon.svg" />
                           </span>
                           Add button
                        </a>
                     </div>
                  </div>
               </div>
               <div class="window-module action-buttons">
                  <h3>Actions</h3>
                  <div>
                      <a class="button-link" title="Join" href="#">
                           <span class="icon-sm">
                              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="ArrowForwardIcon"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                           </span>
                           <span class="sidebar-action-text">Move</span>
                        </a>
                      <a class="button-link" title="Join" href="#">
                           <span class="icon-sm">
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                           </span>
                           <span class="sidebar-action-text">Copy</span>
                        </a>
                      <a class="button-link" title="Join" href="#">
                           <span class="icon-sm">
                           </span>
                           <span class="sidebar-action-text">Make template</span>
                        </a>
                      <a class="button-link" title="Join" href="#">
                           <span class="icon-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 122.88 65.06" style="enable-background:new 0 0 122.88 65.06" xml:space="preserve"><g><path d="M0.95,30.01c2.92-3.53,5.98-6.74,9.15-9.63C24.44,7.33,41.46,0.36,59.01,0.01c17.51-0.35,35.47,5.9,51.7,19.29 c3.88,3.2,7.63,6.77,11.24,10.74c1.16,1.28,1.22,3.17,0.23,4.51c-4.13,5.83-8.88,10.82-14.07,14.96 C95.12,59.88,79.34,64.98,63.35,65.06c-15.93,0.07-32.06-4.86-45.8-14.57c-6.14-4.34-11.81-9.63-16.78-15.85 C-0.34,33.24-0.23,31.27,0.95,30.01L0.95,30.01z M61.44,26.46c0.59,0,1.17,0.09,1.71,0.24c-0.46,0.5-0.73,1.17-0.73,1.9 c0,1.56,1.26,2.82,2.82,2.82c0.77,0,1.46-0.3,1.97-0.8c0.2,0.6,0.3,1.24,0.3,1.9c0,3.35-2.72,6.07-6.07,6.07 c-3.35,0-6.07-2.72-6.07-6.07C55.37,29.18,58.09,26.46,61.44,26.46L61.44,26.46z M61.44,10.82c5.99,0,11.42,2.43,15.35,6.36 c3.93,3.93,6.36,9.35,6.36,15.35c0,5.99-2.43,11.42-6.36,15.35c-3.93,3.93-9.35,6.36-15.35,6.36c-5.99,0-11.42-2.43-15.35-6.36 c-3.93-3.93-6.36-9.35-6.36-15.35c0-5.99,2.43-11.42,6.36-15.35C50.02,13.25,55.45,10.82,61.44,10.82L61.44,10.82z M71.89,22.08 c-2.67-2.67-6.37-4.33-10.45-4.33c-4.08,0-7.78,1.65-10.45,4.33c-2.67,2.67-4.33,6.37-4.33,10.45c0,4.08,1.65,7.78,4.33,10.45 c2.67,2.67,6.37,4.33,10.45,4.33c4.08,0,7.78-1.65,10.45-4.33c2.67-2.67,4.33-6.37,4.33-10.45C76.22,28.45,74.56,24.75,71.89,22.08 L71.89,22.08z M14.89,25.63c-2.32,2.11-4.56,4.39-6.7,6.82c4.07,4.72,8.6,8.8,13.45,12.23c12.54,8.85,27.21,13.35,41.69,13.29 c14.42-0.07,28.65-4.67,40.37-14.02c4-3.19,7.7-6.94,11.03-11.25c-2.79-2.91-5.63-5.54-8.51-7.92C91.33,12.51,75,6.79,59.15,7.1 C43.34,7.42,27.93,13.76,14.89,25.63L14.89,25.63z"/></g></svg>
                           </span>
                           <span class="sidebar-action-text">Watch</span>
                        </a>
                      <a class="button-link" title="Join" href="#">
                           <span class="icon-sm">
                              
                           </span>
                           <span class="sidebar-action-text">Archive</span>
                        </a>
                      <a class="button-link" title="Join" href="#">
                           <span class="icon-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6000 3900" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M713 1152c197 0 375 80 504 209 29 29 56 61 80 95l1125-468c-36-85-55-178-55-275 0-197 80-375 209-504S2883 0 3080 0s375 80 504 209 209 307 209 504-80 375-209 504-307 209-504 209-375-80-504-209c-22-22-43-46-62-71l-1132 471c29 77 45 161 45 248 0 54-6 106-17 157l1131 530c11-13 23-26 36-39 129-129 307-209 504-209s375 80 504 209 209 307 209 504-80 375-209 504-307 209-504 209-375-80-504-209-209-307-209-504c0-112 26-219 73-313l-1092-512c-34 66-78 126-130 177-129 129-307 209-504 209s-375-80-504-209S2 2062 2 1865s80-375 209-504 307-209 504-209zm2742-815c-96-96-229-156-376-156s-280 60-376 156-156 229-156 376 60 280 156 376 229 156 376 156 280-60 376-156 156-229 156-376-60-280-156-376zm0 2303c-96-96-229-156-376-156s-280 60-376 156-156 229-156 376 60 280 156 376 229 156 376 156 280-60 376-156 156-229 156-376-60-280-156-376zM1089 1488c-96-96-229-156-376-156s-280 60-376 156-156 229-156 376 60 280 156 376 229 156 376 156 280-60 376-156 156-229 156-376-60-280-156-376z" fill-rule="nonzero"/></svg>
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
export default {}
</script>
