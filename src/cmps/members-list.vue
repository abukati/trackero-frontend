<template>
<div class="members-list-modal pop-over is-shown">
    <div class="no-back">
        <div class="pop-over-header">
            <span class="pop-over-header-title">Members</span>
            <a class="pop-over-header-close-btn icon-sm icon-close"></a>
        </div>
        <div class="pop-over-content">
            <div>
                <div class="pop-over-section">
                    <input class="search-members" type="text" placeholder="Search members">
                    <div class="board-members">
                        <h4>Board members</h4>
                        <ul class="pop-over-member-list">
                            <li class="member-item" v-for="member in members" :key="member._id">
                                <a class="name">
                                    <span class="member ">
                                        <avatar :size="32" :username="member.fullname" :title="`${member.fullname}(${member.username})`" />
                                    </span>
                                    <span class="full-name" :title="member.fullname">
                                        {{member.fullname}}
                                        <span class="username">({{member.username}})</span>
                                    </span>
                                        <!-- <span class="icon-sm icon-check checked-icon"></span> -->
                                </a>
                            </li>
                        </ul>
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
    name:"members-list",
    components: {
        Avatar
    },
    computed:{
        members(){
            return this.$store.getters.users
        }
    }
};
</script>
