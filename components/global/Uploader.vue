<template>
  <div>
    <div v-show="notice" class="text-center mb-6">
      <v-alert
        color="yellow"
        message="1000 x 640 recommended resolution"
        :dismissable="true"
      />
      <!-- (files && !files.length) || ($refs.upload && $refs.upload.dropActive) -->
      <!-- v-if="files && files.length" -->
    </div>
    <ul class="file-items">
      <li v-for="(file, index) in Array(limit).keys()" :key="index">
        <div
          class="img-preview"
          :style="{ backgroundImage: 'url(' + file.thumb + ')' }"
        >
          <span v-if="file.success" class="success-badge"></span>
        </div>
        <div class="img-details">
          <div class="grid grid-cols-12 w-100 mx-0">
            <div class="col-span-6 mb-3 mb-md-0">
              <span class="photo-desc">PHOTO DETAILS:</span><br />
              <div class="to-hidden">
                Name: <strong>{{ file.name }}</strong>
              </div>
              <!-- <div>File size: <strong>{{file.size | formatSize}}</strong></div> -->
              <div v-if="file.error">
                Error status:
                <strong class="text-danger">
                  {{ errorMessage(file) }}
                </strong>
              </div>
              <div v-else>
                Upload Status:
                <strong v-if="file.success" class="text-success"
                  >Success</strong
                >
                <strong v-else-if="file.active" class="text-warning"
                  >Active</strong
                >
                <strong v-else class="text-warning">Inactive</strong>
              </div>
            </div>
            <div class="col-span-6 my-auto text-center text-lg-right">
              <div
                v-if="
                  file.active || (file.progress !== '0.00' && !file.success)
                "
                class="progress"
              >
                <div
                  :class="{
                    'progress-bar': true,
                    'bg-danger': file.error,
                    'progress-bar-animated': file.active,
                  }"
                  role="progressbar"
                  :style="{ width: file.progress + '%' }"
                ></div>
              </div>
              <span
                class="photo-action delete"
                @click.prevent="$refs.upload.remove(file)"
                >Delete</span
              >
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="text-center" :class="{ 'd-none': !canAddMore }">
      <client-only>
        <FileUpload
          ref="upload"
          v-model="files"
          class="btn btn-primary px-4"
          :name="name"
          :post-action="postAction"
          :extensions="extensions"
          :accept="accept"
          :multiple="multiple"
          :maximum="limit"
          :directory="directory"
          :size="size || 0"
          :thread="thread < 1 ? 1 : thread > 5 ? 5 : thread"
          :headers="headers"
          :data="data"
          :drop="drop"
          :drop-directory="dropDirectory"
          :add-index="addIndex"
          @input-filter="inputFilter"
          @input-file="inputFile"
        >
          <i class="fa fa-plus"></i>
          &nbsp;Add more photos
        </FileUpload>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'

export default {
  name: 'VUploader',
  components: {
    FileUpload,
  },
  props: {
    limit: { type: Number, default: 5 },
    notice: { type: Boolean, default: false },
  },
  data() {
    return {
      reset: false,
      files: [],
      photo: {
        blob:
          'blob:http://front.tamoimages.tld/113aec26-e9d4-4e63-b010-b32db09e8abf',
      },
      accept: 'image/png,image/jpeg,image/bmp',
      extensions: 'jpg,jpeg,png,bmp',
      minSize: 1024,
      size: 1024 * 1024 * 10,
      multiple: true,
      directory: false,
      drop: true,
      dropDirectory: true,
      addIndex: false,
      thread: 1,
      name: 'file',
      postAction: this.$axios.defaults.baseURL + '/photos/upload',
      putAction: this.$axios.defaults.baseURL + '/photos/upload',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${this.$store.getters['auth/token']}`,
      },
      data: {
        // '_csrf_token': 'xxxxxx',
      },
      autoCompress: 1024 * 1024,
      uploadAuto: true,
      addData: {
        show: false,
        name: '',
        type: '',
        content: '',
      },
      editFile: {
        show: false,
        name: '',
      },
    }
  },

  computed: {
    ...mapState({
      storedFiles: (state) => state.upload.files,
      workflow: (state) => state.upload.workflow,
    }),
    canAddMore() {
      return this.files && this.files.length && this.files.length < this.limit
    },
  },

  watch: {
    'addData.show'(show) {
      if (show) {
        this.addData.name = ''
        this.addData.type = ''
        this.addData.content = ''
      }
    },
    files(newFiles, oldFiles) {
      // console.log('Files changed', newFiles)
      this.$store.commit('upload/UPDATE_FILES', newFiles)
    },
    storedFiles(newFiles, oldFiles) {
      // restore previous files
      if (newFiles && newFiles.length && !this.files.length) {
        this.files = newFiles
      }
      // clear previous files
      if (newFiles && !newFiles.length && this.files.length) {
        this.reset = true
        this.$refs.upload.clear()
      }
    },
  },

  methods: {
    errorMessage(file) {
      const message = _.get(file, 'response.errors.file[0]', file.error)
      return message
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // Filter system files or hide files
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        // Filter php html js file
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        newFile.blob = ''
        const URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
        // Thumbnails
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
    },
    // add, update, remove File Event
    async inputFile(newFile, oldFile) {
      if (newFile && oldFile) {
        this.reset = false
        // update
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (
            newFile.size >= 0 &&
            this.minSize > 0 &&
            newFile.size < this.minSize
          ) {
            this.$refs.upload.update(newFile, { error: 'size' })
          }
        }
        if (newFile.progress !== oldFile.progress) {
          // progress
          // console.log('Upload progress', newFile)
        }
        if (newFile.error && !oldFile.error) {
          // error
          // console.log('Upload error', newFile)
        }
        if (newFile.success && !oldFile.success) {
          // success
          // console.log('Upload success', newFile)
        }
      }
      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.data.id && !this.reset) {
          await this.$axios.delete(
            '/photos/upload/delete?id=' + oldFile.response.data.id
          )
          // console.log('Delete uploaded file', deleted)
        }
      }
      // Automatically activate upload
      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        if (this.uploadAuto && !this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }
    },
    alert(message) {
      alert(message)
    },
  },
}
</script>

<style scoped>
/** Uploader style */
.file-uploads {
  overflow: hidden;
  position: relative;
  text-align: center;
  display: inline-block;
}
.file-uploads.file-uploads-html4 >>> label,
.file-uploads.file-uploads-html5 >>> label {
  width: 100%;
  height: 100%;
  position: absolute;
  margin-bottom: 0;
  top: 0;
  left: 0;
}
.file-uploads.file-uploads-html4 >>> input[type='file'] {
  opacity: 0;
  font-size: 20em;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.file-uploads.file-uploads-html5 >>> input[type='file'] {
  overflow: hidden;
  position: fixed;
  width: 1px;
  height: 1px;
  z-index: -1;
  opacity: 0;
}
/* strong { font-weight: 500; } */
.to-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.upload-notice {
  background: #eee;
  border-radius: 5px;
  padding: 5px 32px 5px 5px;
  font-family: 'Gothic A1', Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #575757;
  display: inline-block;
}
.upload-notice > span {
  font-family: 'Gothic A1', Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 13px;
  color: #fff;
  background: #ae276d;
  display: inline-block;
}
.drag-drop-box {
  padding: 20px;
  min-height: 325px;
  background: linear-gradient(180deg, #f7f7f7 0%, #e5e5e5 100%);
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 12px;
  display: flex;
}
.drag-drop-box > td {
  display: inline-block;
  margin: 0 auto;
}

.choose-file-label {
  font-family: 'Gothic A1', Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #7b7b7b;
  max-width: 180px;
}

.preview-image {
  position: relative;
  max-width: 100%;
  display: none;
}

.progress {
  height: 3px;
  position: absolute;
  width: calc(100% - 54px);
  bottom: -16px;
  right: 15px;
}

.success-badge {
  display: inline-block;
  position: absolute;
  border-radius: 9px;
  width: 17px;
  height: 17px;
  left: 7px;
  top: 7px;
  background-color: rgba(76, 175, 80, 0.67);
  background-image: url(/icons/upload/check.svg);
  background-position: 50%;
  background-repeat: no-repeat;
}

.file-items {
  padding: 0;
  list-style: none;
  margin-bottom: 25px;
}

.file-items > li {
  display: flex;
  min-height: 94px;
  background: #fff;
  border: 1px solid #ece9e9;
  box-sizing: border-box;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  margin-bottom: 15px;
}

.file-items > li > div.img-preview {
  position: relative;
  display: flex;
  width: 153px;
  /* height: 94px; */
  border-radius: 12px;
  background-color: #f2f2f2;
  background-size: cover;
  background-position: 50%;
}

.file-items > li > div.img-details {
  display: flex;
  flex-grow: 1;
  padding: 18px 10px 18px 10px;
}

.photo-desc {
  font-family: 'Gothic A1', Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #868686;
}

.photo-action {
  display: inline-block;
  font-family: 'Gothic A1', Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  padding: 8px 13px 8px 36px;
  border-radius: 6px;
  background-position: top 7.6px left 12px;
  background-repeat: no-repeat;
  margin-right: 12px;
  cursor: pointer;
}

.photo-action:last-child {
  margin-right: 0;
}

.photo-action.view {
  color: #ae276d;
  background-color: rgba(174, 39, 109, 0.08);
  background-image: url(/icons/upload/image.svg);
}

.photo-action.delete {
  color: #f00;
  background-color: rgba(255, 0, 0, 0.08);
  background-image: url(/icons/upload/delete.svg);
}

@media (max-width: 575.95px) {
  .file-items > li {
    display: block !important;
  }
  .img-preview,
  .img-details {
    display: block !important;
    width: 100% !important;
  }
  .img-preview {
    min-height: 220px !important;
    border-radius: 12px 12px 0 0 !important;
  }
  .photo-action {
    width: calc(50% - 8px) !important;
  }
}
</style>
