<template>
  <div class="upload-list">
    <img class="sfz-img" v-if="currentUrl" :src="currentUrl">
    <a-upload
      :customRequest="uploadImg"  :before-upload="beforeUpload" :show-upload-list="false"
      v-if="!view"
    >
      <a-button> <a-icon type="upload" />
        {{btnTitle}} </a-button>
    </a-upload>
  </div>
</template>

<script>
import { upLoadPicture } from '@/api/BaseBusiness'
export default {
  name: 'index',
  props: {
    imageUrl: {
      type: [String],
      default () {
        return {}
      }
    },
    btnTitle: {
      type: [String],
      default () {
        return {}
      }
    },
    filed: {
      type: [String],
      default () {
        return {}
      }
    },
    view: {
      type: [Boolean],
      default () {
        return false
      }
    }
  },
  data () {
    const baseApiPath = window.BASE_API_URL
    return {
      baseApiPath,
      imageInfo: '',
      loading: false,
      currentUrl: this.imageUrl //currentUrl接收父组件传来的imageUrl值
    }
  },
  created () {
  },
  methods: {
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("只能上传jpg/png格式的图片");
      }
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      //   this.$message.error("图片不得大于2MB!");
      // }
      return isJpgOrPng;
    },
    uploadImg (file) {
      const newData = new FormData()
      newData.append('file', file.file)
      upLoadPicture(newData).then(res => {
        let response = JSON.stringify(res.data)
        this.imageInfo = '<field><name>' + this.filed + '</name><title></title><value><![CDATA[' + res.data.url +
          ']]></value><text><![CDATA[[' + response + ']]]></text></field>'

        this.currentUrl = window.BASE_API_URL + res.data.url

        this.$emit('setImage', this.imageInfo, this.currentUrl)
      })
        .catch(err => {
          console.log('失败', err)
        })
    }
  }
}
</script>

<style>
</style>
