<template>
   <section class="login-signup-page main-container">
      <div class="login-signup-header">
         <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            role="img"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
         >
            <title></title>
            <path
               d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-6c0 .794-.645 1.44-1.44 1.44H15c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.646-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v7.62z"
            ></path>
         </svg>
         <h3 class="logo-text">Trackero</h3>
      </div>
      <div class="login-signup flex column">
         <h3>Log in to Marshmello</h3>
         <form action="#" class="login-form flex column">
            <input
               name="username"
               type="username"
               placeholder="Enter user name"
               value=""
            /><input
               name="password"
               type="password"
               placeholder="Enter password"
               autocomplete="off"
               value=""
            /><button
               type="submit"
               class="login-signup-btn nav-button"
               style="color: rgb(23, 43, 77)"
            >
               Log in
            </button>
         </form>
         OR<br /><button
            type="button"
            class="google-login-btn flex align-center justify-center"
            style="
               background-color: rgb(255, 255, 255);
               display: inline-flex;
               align-items: center;
               color: rgba(0, 0, 0, 0.54);
               box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px,
                  rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
               padding: 0px;
               border-radius: 2px;
               border: 1px solid transparent;
               font-size: 14px;
               font-weight: 500;
               font-family: Roboto, sans-serif;
            "
         >
            <div
               style="
                  margin-right: 10px;
                  background: rgb(255, 255, 255);
                  padding: 10px;
                  border-radius: 2px;
               "
            >
               <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#000" fill-rule="evenodd">
                     <path
                        d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                        fill="#EA4335"
                     ></path>
                     <path
                        d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                        fill="#4285F4"
                     ></path>
                     <path
                        d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                        fill="#FBBC05"
                     ></path>
                     <path
                        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                        fill="#34A853"
                     ></path>
                     <path fill="none" d="M0 0h18v18H0z"></path>
                  </g>
               </svg>
            </div>
            <span style="padding: 10px 10px 10px 0px; font-weight: 500"
               >Continue with Google</span
            ></button
         ><a href="/signup">Sign up for an account</a>
      </div>
      <div class="right-svg">
         <img
            src="/static/media/login-svg-right.df08073f.svg"
            alt="right-svg"
         />
      </div>
      <div class="left-svg">
         <img src="/static/media/login-svg-left.ff7c7688.svg" alt="left-svg" />
      </div>
   </section>
</template>

<script>
import { userService } from "../services/user-service.js"

export default {
   data() {
      return {
         username: "",
         password: "",
         user: null,
         reviews: [],
         userId: null,
      }
   },
   created() {
      this.loadUsers()
      this.userId = this.$store.getters.loggedinUserId || null

      this.reviews = this.$store.getters.reviews || []
   },
   methods: {
      async doLogin() {
         try {
            // const user = await userService.login(this.username, this.password);
            const user = await this.$store.dispatch({
               type: "login",
               username: this.username,
               password: this.password,
            })
            this.user = user
            this.$store.commit({ type: "setLoggedinUser", user })
            this.userId = this.$store.getters.loggedinUserId
            console.log("this.userId", this.userId)
            // this.$store.dispatch({
            //   type: "loadReviews",
            //   userId: this.userId,
            // });
            this.reviews = this.$store.getters.reviews
            console.log("reviews", this.reviews)
            this.$router.push("/toy")
         } catch (err) {
            console.log(err)
         }
      },
      async doLogout() {
         try {
            this.$store.dispatch({ type: "logout" })
            // const ans = await userService.logout();
            this.user = null
            this.userId = null
            this.$router.go()
         } catch (err) {
            console.log(err)
         }
      },
      loadUsers() {
         this.$store.dispatch({ type: "loadUsers" })
      },
      async removeUser(userId) {
         try {
            await this.$store.dispatch({ type: "removeUser", userId })
            console.log("User removed")
         } catch (err) {
            console.log("Failed to remove user")
         }
      },
   },
   computed: {
      getLoggedinUser() {
         return this.$store.getters.loggedinUser || ""
      },
      users() {
         return this.$store.getters.users
      },
      // reviews() {
      //   return this.$store.getters.reviews;
      // },
   },
};
</script>


