<template>
   <div class="board-menu" :class="{hide: !isBoardMenuOpen}">
      <div class="board-menu-container">
         <div class="board-menu-tab-content">
            <div class="board-menu-header is-board-menu-default-view is-in-frame">
               <div class="board-menu-header-content">
                  <a class="board-menu-header-back-button icon-back" title="Go back."></a>
                  <h3 class="board-menu-header-title">Menu</h3>
                  <a class="board-menu-header-close-button icon-close" title="Close the board menu."></a>
               </div>
               <hr class="board-menu-header-divider" />
            </div>
            <div class="board-menu-content custom-scrollbar">
               <div class="board-menu-content-container">
                  <ul class="board-menu-navigation">
                     <li class="board-menu-navigation-item">
                        <a class="board-menu-navigation-item-link toggle-about-this-board">
                           <span class="board-menu-navigation-item-link-icon icon-board"></span>
                           &nbsp;About this board
                           <div class="board-menu-navigation-item-link-summary board-menu-about-this-board-summary">
                              &nbsp;Add a description to your board
                           </div>
                        </a>
                     </li>
                     <li class="board-menu-navigation-item mod-background">
                        <a class="board-menu-navigation-item-link change-background">
                           <span class="board-menu-navigation-item-link-icon fill-background-preview"></span>
                           &nbsp;Change background
                        </a>
                     </li>
                     <li class="board-menu-navigation-item">
                        <a class="board-menu-navigation-item-link open-labels">
                           <span class="icon-label board-menu-navigation-item-link-icon"></span>
                           &nbsp;Labels
                        </a>
                     </li>
                     <li class="board-menu-navigation-item">
                        <a class="board-menu-navigation-item-link open-archive">
                           <span class="icon-archive board-menu-navigation-item-link-icon"></span>
                           &nbsp;Archived items
                        </a>
                     </li>
                     <li class="board-menu-navigation-item">
                        <a class="board-menu-navigation-item-link open-more">
                           <span class="icon-overflow-menu-horizontal board-menu-navigation-item-link-icon"></span>
                           &nbsp;More
                        </a>
                     </li>
                  </ul>
                  <hr />
                  <a class="board-board-menu-section-header">
                     <span class="board-menu-section-header-icon icon-activity"></span>
                     <span class="board-menu-section-header-title">Activity</span>
                     <span class="board-menu-section-header-count unread-activity-count"></span>
                  </a>
                  <div class="menu-action-list">
                     
                  </div>
                  <a class="show-more fill-activity-btn">View all activity...</a>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'board-nav-side-menu',
   props: {
      onSideMenuOpen: Function, required: true,
      isBoardMenuOpen: Boolean, required: true,
      board: Object, required: true
   },
   // data() {
   //    return {
   //       currGroups: this.board.groups
   //    }
   // }
}
</script>

<style>

</style>