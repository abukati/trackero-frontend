<template>
    <div class="check-list-modal pop-over is-shown">
        <div class="no-back">
            <div class="pop-over-header">
                <span class="pop-over-header-title">Add checklist</span>
                <a class="pop-over-header-close-btn icon-sm icon-close" @click="toggleList"></a>
            </div>
            <div class="pop-over-content">
                <div>
                    <div class="pop-over-section">
                        <form>
                            <label for="id-checklist">Title</label>
                            <input id="id-checklist" class="checklist-input" type="text" value="Checklist" dir="auto" maxlength="512">
                            <input class="nch-button add-btn" type="submit" value="Add">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'check-list',
    props:['info'],
    methods:{
        toggleList(){
            this.$emit('toggleList')
        },
    }
}
</script>
