<template>
   <div class="attachments-list-modal pop-over is-shown">
      <div class="no-back">
         <div class="pop-over-header">
            <span class="pop-over-header-title">Attach from...</span>
            <a
               class="pop-over-header-close-btn icon-sm icon-close"
               @click="toggleList"
            ></a>
         </div>
         <div class="pop-over-content">
            <!-- <input class="search-attachments" type="text" placeholder="Paste any link here" v-model="addedLink"> -->
            <div class="pop-over-section">
               <div class="attach-from">
                  <label for="upload">
                     <span>Computer</span>
                     <input
                        name="upload"
                        class="choose-file"
                        type="file"
                        @click.self.stop
                        @change="onUploadImg"
                     />
                  </label>
               </div>
               <form class="attach-link">
                  <label class="label">Attach a link</label>
                  <input
                     class="search-input"
                     placeholder="Paste any link here..."
                  />
                  <button class="card-edit-btn">Attach</button>
               </form>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { uploadImg } from '@/services/imgUpload.service.js'

export default {
   name: "attachments-list",
   components: {
   },
   props: ['info'],
   data() {
      return {
         filterBy: {
            title: '',
            files: []
         },
      }
   },
   methods: {
      async onUploadImg(ev) {
         try {
            let res = await uploadImg(ev)
            console.log('res.url', res.url)
         } catch (err) {
            console.log(err)
         }
      },
      attachmentEnter(ev) {
         ev.target.classList.add('attachment-hover')
      },
      attachmentLeave(ev) {
         ev.target.classList.remove('attachment-hover')
      },
      toggleLabel(attachment) {
         const attachmentIdx = this.info.task.attachments.findIndex(currLabel => currLabel.id === attachment.id)
         if (attachmentIdx !== -1) {
            this.$emit('removeLabel', attachment)
         } else {
            this.$emit('addLabel', attachment)
         }
      },
      isLabel(id) {
         const attachmentIdx = this.info.task.attachments.findIndex(attachment => attachment.id === id)
         if (attachmentIdx !== -1) return 'icon-check'
         else return ''
      },
      toggleList() {
         this.$emit('toggleList')
      },
      saveImg(imgUrl) {
         console.log('imgUrl', imgUrl)
         this.imgUrls.push(imgUrl)
         console.log('this.imgUrls', this.imgUrls)
      }

   },
   computed: {
      attachmentsToDisplay() {
         const { title } = this.filterBy
         const regex = new RegExp(title, 'i')
         const attachments = this.$store.getters.attachments
         var filteredAttachments = attachments.filter((attachment) => regex.test(attachment.title))
         return filteredAttachments
      }
   }
}
</script>