<template>
   <header>
      <nav>
         <div>
            <div class="atlassian-btn-wrapper">
               <div class="atlassian-btn-container">
                  <button class="atlassian-app-btn" type="button">
                     <span class="atlassian-app-icon-container">
                        <span class="atlassian-app-switcher">
                           <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C4 4.44772 4.44772 4 5 4H7C7.55228 4 8 4.44772 8 5V7C8 7.55228 7.55228 8 7 8H5C4.44772 8 4 7.55228 4 7V5ZM4 11C4 10.4477 4.44772 10 5 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13V11ZM11 4C10.4477 4 10 4.44772 10 5V7C10 7.55228 10.4477 8 11 8H13C13.5523 8 14 7.55228 14 7V5C14 4.44772 13.5523 4 13 4H11ZM10 11C10 10.4477 10.4477 10 11 10H13C13.5523 10 14 10.4477 14 11V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V11ZM17 4C16.4477 4 16 4.44772 16 5V7C16 7.55228 16.4477 8 17 8H19C19.5523 8 20 7.55228 20 7V5C20 4.44772 19.5523 4 19 4H17ZM16 11C16 10.4477 16.4477 10 17 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H17C16.4477 14 16 13.5523 16 13V11ZM5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H7C7.55228 20 8 19.5523 8 19V17C8 16.4477 7.55228 16 7 16H5ZM10 17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V17ZM17 16C16.4477 16 16 16.4477 16 17V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H17Z" fill="#fff"></path>
                           </svg>
                        </span>
                     </span>
                  </button>
               </div>
            </div>
         </div>
         <router-link class="logo-link" to="/">
            <div class="logo-img-container">
               <div class="logo-content">
                  <p>Trell</p>
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
                     <p>Create</p>
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
