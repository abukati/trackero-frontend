<template>
  <div class="mini-profile">
      <div class="no-back">
        <div class="pop-over-header">
            <span class="pop-over-header-title">Member</span>
            <a class="pop-over-header-close-btn icon-sm icon-close"></a>
        </div>
        <div>
            <div class="pop-over-content">
                <div>
                    <div>
                        <div class="mini-profile">
                            <div class="mini-profile-member member-large">
                                <a class="">
                                    <!-- <avatar :size="50" :username="user.fullname" :title="`${user.fullname}(${user.username})`" /> -->
                                </a>
                            </div>
                            <div class="mini-profile-info">
                                <h3 class="mini-profile-info-title">
                                    <a href="#" class="mini-profile-info-title-link">
                                        <!-- {{user.fullname}} -->
                                    basel boulos
                                    </a>
                                    </h3>
                                    <p class="u-bottom">@baselboulos</p>
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
import Avatar from 'vue-avatar'
export default {
    name:'user-mini-profile',
    props:['user'],
    components: {
		Avatar,
	},
}
</script>