<template>
  <div class="border input-file border-gray-300 text-center p-8">
    <img v-if="logo" class="icon-round mb-8" :src="logo" alt="" srcset="">
    <span v-if="logo.length < 0" class="icon-round mb-8"></span>
    <div v-if="logo.length < 0" class="leading-tight">
      <p class="title text-lg font-bold mb-5">Add Business Logo</p>
    </div>
    <input type="file" id="dropFile" @change="uploadImages" key="dropFile" />
    <label for="dropFile" class='drop_label mb10 flex_column'>
    <p>{{logo.length > 0 ? 'Change Logo' :'Upload Logo'}}</p>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    callback: { type: Function, default: () => {} },
    logo:  String,
    campId: Number,
  },
  data() {
    return {
      files: '',
      Image: [],
    }
  },
  methods: {
    async uploadImages(e) {
      e.preventDefault();
        const {name, files} = e.target;
        let types = ['image/jpeg', 'image/png'];
        if(files){
            let allFile = [...files];
            let FileSize = "5000000";
            let result = allFile.filter((f)=>{
                return types.some((s)=>{
                   return (f.type == s) && (f.size <= FileSize );
                })
            });
           result.length <= 0 && (err = "unsupported image type* accepted image jpg/png or file size is greater than 5mb", dismissable= true);
           const data = {
            files: files[0],
            id: this.campId,
           }
           //console.log(this.logo, this.campId)
           await this.$store.dispatch('auth/uploadLogo', data);
           const temporaryUrl = result.length > 0 && result.map((f)=>{
                let url = URL.createObjectURL(f);
                return url;
           });
           result.length > 0 && (this.logo = temporaryUrl[0]);
           temporaryUrl.length > 0 && (this.logo = temporaryUrl[0]);
        }
    },
  },
}
</script>

<style scoped>
.drop_label > p {
  padding: 10px 24px;
  color: #007aff;
  font-weight: 500;
  border: 2px solid #007aff;
}

.title {
  max-width: 135px;
  display: inline-block;
}

.input-file > img {
  object-fit: cover;
}

.icon-round {
  width: 120px;
  height: 120px;
  display: inline-block;
  border-radius: 60px;
  background-image: url('/icon/started-icon.svg');
  background-repeat: no-repeat;
  background-position: 50%;
  @apply bg-blue-200;
}
</style>
