<template>
   <header>
      <nav>
         <router-link class="logo-link" to="/">
            <div class="logo-img-container">
               <div class="logo-content">
                  <!-- <img src="@/assets/img/icon-static.gif" alt="trackero logo" />
                  Trackero -->
               </div>
            </div>
         </router-link>
         <div class="nav-main-wrapper">
            <div class="nav-main-container">
               <div class="nav-main-links">
                  <router-link class="nav-link-btn" to="/board">
                     <span class="btn-text">Workspaces</span>
                     <span class="btn-icon-container">
                        <span class="modal-icon">
                           <img src="@/assets/img/arrow-down.svg" alt="Expand menu" />
                        </span>
                     </span>
                  </router-link>
                  <router-link class="nav-link-btn" to="/board">
                     <span class="btn-text">Starred</span>
                     <span class="btn-icon-container">
                        <span class="starred-icon">
                           <img src="@/assets/img/arrow-down.svg" alt="Expand menu" />
                        </span>
                     </span>
                  </router-link>
               </div>
               <div class="nav-board-create">
                  <router-link class="nav-item" to="/board">
                     <p> Create </p>
                  </router-link>
               </div>
               <div class="spacer">
                  <div class="spacer-content"></div>
               </div>
            </div>
         </div>
         <div class="nav-reactive-links">
            <div class="nav-search-bar">
               <label for="search-input-area" class="nav-label">
                  Jump to recent and starred boards, or search
               </label>
               <div role="presentation">
                  <input id="search-input-area" class="search-input" type="search" autocomplete="false" 
                     autocorrect="false" spellcheck="false" placeholder="Search" />
               </div>
               <span class="search-icon-wrapper">
                  <label for="search-icon-area">
                     <span class="search-icon-container">
                        <span class="search-icon">
                           <img src="@/assets/img/search-icon.svg" alt="Search menu" />
                        </span>
                     </span>
                  </label>
               </span>
            </div>
            <button class="info-btn" type="button" aria-label="Open information menu">
               <span class="info-icon-container">
                  <span class="info-icon">
                     <img src="@/assets/img/info-icon.svg" alt="Information icon" />
                  </span>
               </span>
            </button>
            <button class="notifications-btn" type="button" aria-label="Open notifications center">
               <span class="notifications-icon-container">
                  <span class="notifications-icon">
                     <img src="@/assets/img/bell-icon.svg" alt="Notifications center icon" />
                  </span>
               </span>
            </button>
            <div class="user-btn-spacer"></div>
            <router-link class="user-profile-btn" to="/user">
               <div class="user-avatar-container">
                  <avatar class="user-avatar" username="Guest" :size="32"></avatar>
               </div>
            </router-link>
         </div>
      </nav>
   </header>
</template>
<script>
import Avatar from 'vue-avatar'

export default {
   components: {
      Avatar
   }
}
</script>