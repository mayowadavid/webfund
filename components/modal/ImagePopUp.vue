<template>
    <v-modal :show="show" title="Image popUp" backdrop="static" @hide="hideModal">
      <v-form
      id="image-popUp"
      ref="form"
      :loading.sync="loading"
      :on-submit="onSubmit"
      :on-success="onSuccess"
      success-message="Plan created successfullly"
    >
      <div class='imagePreview'>
          <div class='arrowContainer flex_row'>
            <div class='arrows flex_row'>
                <img @click="decreaseIndex" src='/arrow_left.png' alt="sendit"/>
            </div>
            <div class='arrows flex_row'>
                  <img @click="increaseIndex" src='/arrow_right.png' alt="sendit"/>
            </div>
          </div>
          <img :src="temporaryImage[imgPreviewIndex]?.url" alt="sendit"/>
      </div>
     </v-form>
   </v-modal>
</template>
<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    temporaryImage: Array,
  },
  data() {
    return {
      loading: false,
      status: ['active', 'pending', 'terminated'],
      imgPreviewIndex: 0,
    }
  },
   methods: {
    hideModal() {
      this.$emit('hide')
    },
     increaseIndex(e) {
      e.preventDefault();
      if(this.imgPreviewIndex == (this.temporaryImage.length - 1)){
        this.imgPreviewIndex = 0;
      }else {
        this.imgPreviewIndex = this.imgPreviewIndex + 1;
      }
    },

    // image preview decrement
    decreaseIndex(e) {
      e.preventDefault();
      if(this.imgPreviewIndex !== 0){
        this.imgPreviewIndex = this.imgPreviewIndex - 1;
      }else {
        this.imgPreviewIndex = this.temporaryImage.length - 1;
      }
    },
    onSubmit() {},
    onSuccess() {},
  },
}
</script>
