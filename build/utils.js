/* utils.js */
const path = require('path')

// glob 是 webpack 安装时依赖的一个第三方模块，该模块允许你使用 * 等符号,
// 例如 lib/*.js 就是获取 lib 文件夹下的所有 js 后缀名的文件
const glob = require('glob')

// 取得相应的页面路径，因为之前的配置，所以是 src 文件夹下的 pages 文件夹
const PAGE_PATH = path.resolve(__dirname, '../src/pages')

/*
 * 多入口配置
 * 通过 glob 模块读取 pages 文件夹下的所有对应文件夹下的 js * 后缀文件，如果该文件存在
 * 那么就作为入口处理
 */
exports.getEntries = () => {
  let entryFiles = glob.sync(PAGE_PATH + '/*/*.js') // 同步读取所有入口文件
  let map = {}
  // 遍历所有入口文件
  entryFiles.forEach(filePath => {
    // 获取文件名
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))

    // 以键值对的形式存储
    map[filename] = filePath
  })
  return map
}

exports.getEntryForAll = (globPath) => {
  let entries = {}
  let basename; let tmp; let pathname
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
    // console.log(entry)
    tmp = entry.split('/').splice(-3)
    pathname = basename
    // 正确输出js和html的路径
    var fileIs = glob.sync(entry + tmp[1] + '.html')
    console.log('getEntryForAll入口文件：' + entry + tmp[1] + '.html')

    entries[pathname] = {
      entry: 'src/' + tmp[0] + '/' + tmp[1] + '/main.js',
      template: fileIs.length ? 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.html' : 'public/index.html',
      title: '',
      filename: tmp[1] + '.html',
      chunks: ['chunk-vendors', 'chunk-common', pathname]
    }
    console.log(pathname + '----->entrie item:' + JSON.stringify(entries[pathname]))
  })
  console.log('----->entries:' + JSON.stringify(entries))
  return entries
}

// 路径为当前调用目录的相对路径
exports.getEntry = (pPath) => {
  let entryObj = {}
  let basename; let tmp; let pathname

  basename = path.basename(pPath, path.extname(pPath))
  tmp = pPath.split('/').splice(-3)
  pathname = basename
  var fileIs = glob.sync(pPath + tmp[1] + '.html')
  console.log('getEntry入口文件：' + pPath + tmp[1] + '.html')

  entryObj[pathname] = {
    entry: 'src/' + tmp[0] + '/' + tmp[1] + '/main.js',
    template: fileIs.length ? 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.html' : 'public/index.html',
    title: '',
    filename: tmp[1] + '.html',
    chunks: ['chunk-vendors', 'chunk-common', pathname]
  }
  return entryObj
}
