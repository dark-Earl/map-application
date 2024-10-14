// 判断外链
export default {
  install (Vue) {
    Vue.directive('checkExtLink', {
      bind (el, binding) {
        // console.log(el,binding)
        el.addEventListener('click', function (e) {
          e.preventDefault()
          // console.log(el.getAttribute('href'), el.href)
          // console.log(window.location.origin)
          function isExtLink (url) {
            let haveHTTP = url.indexOf('http')
            let haveHTTPS = url.indexOf('https')
            let haveFTP = url.indexOf('ftp')
            if ((haveHTTP > -1) || (haveHTTPS > -1) || (haveFTP > -1)) {
              let selfOrigin = window.location.origin
              if (url.indexOf(selfOrigin) === -1) { // 不包含本站域名 是外链
                return true
              }
            }
            return false
          }

          let isExtLinkResult = isExtLink(el.getAttribute('href'))
          if (isExtLinkResult) {
            window.open(window.BASE_URL + 'wblj.html#/?goto=' + encodeURIComponent(el.href))
          } else {
            window.location.href = el.href
          }
        })
      }
    })
  }
}
