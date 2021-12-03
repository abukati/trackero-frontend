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
                                 <a class="description-fake-text-area" href="#">
                                    <p class="u-bottom">Add a more detailed description…</p>
                                 </a>
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
               <div class="plugin-buttons">
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
               <div class="butler-buttons">
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
            </div>
			</div>
         </div>
		</div>
	</div>
</template>

<script>
export default {}
</script>
