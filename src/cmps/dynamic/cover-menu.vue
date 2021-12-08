<template>
	<div :style="{top: info.modalPos.posY + 'px'}" class="cover-menu-modal pop-over is-shown details-popup">
		<div class="no-back">
			<div class="pop-over-header">
				<span class="pop-over-header-title">Cover</span>
				<a class="pop-over-header-close-btn icon-sm icon-close" @click="toggleList"></a>
			</div>
			<div class="pop-over-content">
				<div>
					<div class="pop-over-section">
						<h4>Size</h4>
                        <div>
                            <div role="button" class="bgc-btn" :style="{backgroundColor:info.task.style.bgColor} ">
                                <div class="bgc-btn-style">
                                    <div class="bgc-btn-style-line1"></div>
                                    <div class="bgc-btn-style-line2"></div>
                                </div>
                            </div>
                        </div>
						    <button @click="removeTaskCover" class="remove-cover-btn">Remove cover</button>
						<div class="cover-menu-actions">
                            <h4>Colors</h4>
                            <openColors @changeTaskCover="changeTaskCover" :info="info"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import openColors from './sidemenu-colors'

export default {
	name: 'cover-menu',
	props: ['info'],
    components: {
        openColors
    },
	methods: {
		toggleList() {
			this.$emit('toggleList');
		},
        changeTaskCover(color){
           this.$emit('changeTaskCover',color)
        },
        removeTaskCover(){
            this.$emit('removeTaskCover')
        }
	},
};
</script>
