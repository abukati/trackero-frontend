<template>
   <header>
      <nav>
         <div class="logo-container">
            <router-link class="logo" to="/">Trackero</router-link>
         </div>
         <div class="nav-links">
            <div class="nav-board-links">
               <router-link class="nav-item" to="/board">Boards</router-link>
               <router-link class="nav-item" to="/board">Starred</router-link>
               <router-link class="nav-item" to="/board">Create</router-link>
            </div>
            <div class="nav-user-links">
               <router-link class="nav-item" to="/user">
                  <span>
                     <img src="@/assets/img/bell-regular.svg" alt="notifications center icon">
                  </span>
               </router-link>
               <router-link class="nav-item" to="/user">user</router-link>
            </div>
         </div>
      </nav>
   </header>
</template>
<script>
export default {
}
</script>
