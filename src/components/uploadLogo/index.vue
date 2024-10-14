<template>
  <a-upload :customRequest="uploadImg" name="avatar" :before-upload="beforeUpload" :disabled="disabled"
            list-type="picture-card" class="avatar-uploader" :show-upload-list="false">
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width: 150px;height: auto;" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
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
    filed: {
      type: [String],
      default () {
        return {}
      }
    },
    disabled: Boolean
  },
  data () {
    const baseApiPath = window.BASE_API_URL
    return {
      baseApiPath,
      imageInfo: '',
      loading: false
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

        this.imageUrl = window.BASE_API_URL + res.data.url

        this.$emit('setImage', this.imageInfo, this.imageUrl)
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
