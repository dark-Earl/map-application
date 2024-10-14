/**
 *
 * @param config
 * {
        id:"",//项目ID
        classify:"",//项目类型、分类
        jsonStr:JSON.stringify({    //定义es查询时需要读取的字段
            "projectId":""//项目ID
            ,"projectType":""//项目类型
            ,"projectTypeName":""//项目类型名称
            ,"projectName":""//项目名称
            ,"uri":""//项目详情访问地址
            ,"imguri":""//项目图片地址
        })
    }
 */
export function accessTrackingLog (config) {
  if (config !== undefined) {
    let oAjax = null
    if (window.XMLHttpRequest) {
      oAjax = new XMLHttpRequest()// 创建ajax对象
    } else {
      oAjax = new ActiveXObject('Microsoft.XMLHTTP')// IE6浏览器创建ajax对象
    }

    var uri = []
    uri.push(window.BASE_API_URL)
    uri.push('/accessTracking/log?')
    uri.push('id=' + encodeURIComponent(window._accessTracking_config['id']))
    uri.push('&classify=' + encodeURIComponent(window._accessTracking_config['classify']))
    uri.push('&jsonStr=' + encodeURIComponent(window._accessTracking_config['jsonStr']))
    uri.push('&t=' + new Date().getTime())
    oAjax.open('POST', uri.join(''), true)

    // 发送请求
    oAjax.send()
  }
}
