<template>
	<div class="window-overlay">
		<div class="window">
			<div class="window-wrapper">
				<a class="dialog-close-button" href="#">
					<img src="@/assets/img/close-icon.svg" />
				</a>
				<div class="task-detail">
					<div class="task-cover">
                  <!-- Unused div -->
						<div class="task-cover-stickers"></div>
						<div class="task-cover-menu">
							<button class="task-cover-menu-button">
                        <span class="icon-sm cover-menu-btn-icon">
                           <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="VideoLabelIcon">
                              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path>
                           </svg>
                        </span>
                     Cover
							</button>
						</div> 
				</div>
            <div class="window-header">
               <span class="icon-lg window-header-icon">
                  <svg></svg>
               </span>
               <div class="window-title">
                 <textarea class="task-detail-title-input"></textarea>
               </div>
               <div class="window-header-inline-content">
                  <p>in list
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
                  <div class="window-module">
                     <div class="window-module-title">
                        <span class="description-icon icon-lg">
                           <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></svg>
                           <h3>Description</h3>
                        </span>
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
