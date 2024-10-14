import { checkCgsl } from '@/api/bankAcc/BusinessApplyHandle'

/**
 * 表单验证工具类
 */
export default {
  checkcgsl: (khh, gqdm, value) => {
    let params = { khh: khh, gqdm: gqdm, czsl: value }
    checkCgsl(params).then(res => {
      if (res.code === 200) {
        console.log("111111")
        return true
      } else {
        this.$message.error(res.msg)
        return false
      }
    }).catch(e => {
      console.log(e)
      this.$message.error(e.msg)
      return false
    })

    console.log("2222")
  }
}
