// 图片自适应（资讯）
export default {
  install (Vue) {
    Vue.directive('imgResize', {
      componentUpdated (el, binding, vnode) {
        let contWidth = window.getComputedStyle(el).width// 注意此函数需要搭配inserted调用
        contWidth = contWidth.replace(/px/g, '')
        let imgArr = Array.from(el.getElementsByTagName('img'))
        imgArr.forEach(element => {
          element.onload = () => {
            let oldImgWidth = window.getComputedStyle(element).getPropertyValue('width').replace(/px/g, '')
            if (oldImgWidth > parseInt(contWidth)) {
              element.style.width = (parseInt(contWidth) - 50) + 'px'
            }
          }
        })
      }
    })
  }
}
