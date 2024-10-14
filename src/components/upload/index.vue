<template>
  <a-upload :remove="needRemove" :multiple="true" :fileList="fileNewList" :customRequest="downloadFilesCustomRequest"
            :data="{workType: workType ,fileType: fileType}" :disabled="view" :accept="accept"
            @preview="download">
    <a-button v-if="!view">
      <a-icon type="upload"/>
      {{text}}
    </a-button>
  </a-upload>
</template>

<script>

export default {
  name: 'upload',
  props: ['text', 'workType', 'fileType', 'fileList', 'view','accept'],
  data: function () {
    return {
    }
  },
  model: {
    prop: 'filter',
    event: 'change-filter'
  },
  created() {
  },
  methods: {
    needRemove (file) {
      //找到当前文件所在列表的索引
      let index = this.fileNewList.indexOf(file)
      //从列表中移除该文件
      this.fileNewList.splice(index, 1)
      return true
    },
    downloadFilesCustomRequest (data) {
      //自定义上传逻辑
      this.saveFile(data)
    },
    download(info){
      if(info.url.indexOf('pdf_viewer')>0){
        location.href =  info.url
      }else{
        location.href = window.BASE_API_URL + info.url
      }
    },
    saveFile (data) {
      const formData = new FormData()
      formData.append('file', data.file)
      formData.append('workType', data.data.workType)
      formData.append('fileType', data.data.fileType)
      upLoadFile(formData).then(res => {
        if (res.code === 200) {
          let file = this.fileFormatter(res.data)
          this.fileNewList.push(file)
          this.$emit('setFileList', this.fileNewList)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    fileFormatter (data) {
      // 对上传成功返回的数据进行格式化处理，格式化a-upload能显示在已上传列表中的格式（这个格式官方文档有给出的）
      let file = {
        uid: data.fileId,    // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
        name: data.filename,   // 文件名
        originName: data.tempfilename, //文件后台存储名称
        status: 'done', // 状态有：uploading done error removed
        response: '{"status": "success"}', // 服务端响应内容
        url: '',//预览地址
        fileType: data.fileType
      }
      return file
    }
  },
  computed: {
    fileNewList: function () {
      if (this.fileList === undefined){
        return []
      } else {
        return this.fileList
      }
    },
    checked1: {
      get () {
        return this.filter === this.val
      }
    }
  }

}
</script>
