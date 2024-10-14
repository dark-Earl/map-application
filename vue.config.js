const isProduction = process.env.NODE_ENV === 'production'

// 配置pages多页面获取当前文件夹下的html和js
let path = require('path')
let glob = require('glob')

const webpack = require('webpack')
// 取得相应的页面路径，因为之前的配置，所以是 src 文件夹下的 pages 文件夹
const utils = require('./build/utils')
// 遍历pages 目录底下的文件夹，并组成模块
const packPath = process.env.VUE_APP_PACK_PATH
// 构建需要打包的 模块 实现多模块加载
let objectProject = utils.getEntryForAll(packPath)
// let objectProject = utils.getEntry('./src/pages/index/')

let pages = {}
// process.argv 属性会返回一个数组，其中包含当 Node.js 进程被启动时传入的命令行参数。
// 第一个元素是 process.execPath。 如果需要访问 argv[0] 的原始值，则参见 process.argv0。
// 第二个元素是正被执行的 JavaScript 文件的路径。 其余的元素是任何额外的命令行参数。
console.log('----->process.env.VUE_APP_NODE_TEST:' + process.env.VUE_APP_NODE_TEST)
let projectname = process.env.VUE_APP_NODE_TEST == 'test' ? process.argv[5] : process.argv[3]
console.log('----->projectname:' + projectname)
// 获取执行哪个文件
if (!projectname) {
  projectname = 'index' // 设置默认打包页面
}

if (isProduction) {
  // 如果是多工程发布 npm run build demo1,demo2
  /*
  let prjs = projectname.split(",");
  console.log("----->build length:" + prjs.length);
  if (prjs.length > 1) {
    prjs.forEach(function(item, index) {
      pages[item] = objectProject[item];
    })
    projectname = '';//静态样式文件目录
  } else {
    pages[projectname] = objectProject[projectname];
  } */
  pages = utils.getEntryForAll(packPath)
} else {
  pages = utils.getEntryForAll(packPath)
}

const port = process.env.port || process.env.npm_config_port || 8628 // dev port

console.log('----->isProduction:' + isProduction)
console.log('----->pages:' + JSON.stringify(pages))

const Timestamp = new Date().getTime()

module.exports = {
  publicPath: process.env.BASE_URL, // 部署应用包时的基本 URL
  outputDir: 'dist', // build 时生成的生产环境构建文件的目录
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  productionSourceMap: false,
  transpileDependencies: [
    'sm-crypto', 'ant-design-vue'
  ],
  // crossorigin : undefined,

  // 自定义参数模块打包
  pages: pages,

  css: {
    extract: !!isProduction,
    // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false,
    // 开启 CSS source maps?
    // css预设器配置项 启用 CSS modules for all css / pre-processor files.
    // modules: false,
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            'primary-color': '#D50000',
            'link-color': '#D50000',
            'border-radius-base': '0'
          },
          javascriptEnabled: true
        }
      }
    }

  },

  configureWebpack: config => {
    config.output.filename = `js/[name].${Timestamp}.js`
    config.output.chunkFilename = `js/[name].${Timestamp}.js`
    if (isProduction) {
      config.plugins.push(
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'windows.jQuery': 'jquery'
        })
      )
      // process.env.NODE_ENV
      if (process.env.VUE_APP_NODE_TEST != 'test') { // 生成环境执行，测试环境保留log
        // 上线压缩去除console等信息
        config.plugins.push(
          /* new UglifyJsPlugin({
              uglifyOptions: {
                  warnings: false,
                  compress: {
                      drop_console: true,
                      drop_debugger: false,
                      pure_funcs: ['console.log'] // 移除console
                  }
              },
              sourceMap: false,
              parallel: true
          }) */
        )
      }
      if (process.env.VUE_APP_NODE_TEST == 'test') { // 测试环境
        // 调试
        /* config.plugins.push(
            new vConsolePlugin({
                filter: [], // 需要过滤的入口文件
                enable: true // 发布代码前记得改回 false
            })
        ) */
      }
    } else {
      // 调试
      config.plugins.push(
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'windows.jQuery': 'jquery'
        })
      )
    }
  },
  chainWebpack: config => {
    // // ie兼容
    // config.entry('main').add('babel-polyfill')
    // 移除 prefetch preload 插件 按需加载有效
    for (let key in objectProject) {
      config.plugins.delete('prefetch-' + key + '')
      config.plugins.delete('preload-' + key + '')
    }

    // 路径别名
    config.resolve.alias.set('@', path.resolve(__dirname, './src'))
      .set('@public', path.resolve(__dirname, './public'))
      .set('@assets', path.resolve(__dirname, './src/assets'))
      .set('@css', path.resolve(__dirname, './src/assets/css'))
      .set('@img', path.resolve(__dirname, './src/assets/img'))
      .set('@js', path.resolve(__dirname, './src/assets/js'))
      .set('@comps', path.resolve(__dirname, './src/components'))
      .set('@pages', path.resolve(__dirname, './src/pages'))
      .set('@store', path.resolve(__dirname, './src/store'))
      .set('@utils', path.resolve(__dirname, './src/utils'))
      .set('@views', path.resolve(__dirname, './src/views'))
  },
  lintOnSave: false, // 关闭eslint
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js'),
    // 配置多个代理
    proxy: {
      '/artisan-back': {
        target: process.env.VUE_APP_BASE_API, // 要访问的接口域名
        ws: true, // 是否启用websockets
        changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/artisan-back': '' // 这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        }
      }
    }
  }
}
