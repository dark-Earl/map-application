
export const Base = {
  // 控制台日志记录
  Logger: {
    log: function (msg) {
      if (window.console) {
        window.console.log(msg)
      }
    },
    info: function (msg) {
      if (window.console) {
        window.console.info(msg)
      }
    },
    warn: function (msg) {
      if (window.console) {
        window.console.warn(msg)
      }
    },
    error: function (msg) {
      if (window.console) {
        window.console.error(msg)
      }
    }
  }
}

export const ApexWebSocket = {
  ws: null,
  /**
   * 客户端是否支持websocket
   * @returns {boolean}
   */
  isSupport: function () {
    var b = false
    if ('WebSocket' in window) {
      b = true
    } else if ('MozWebSocket' in window) {
      b = true
    }
    return b
  },
  /**
   * 获取ws链接地址
   * @returns {string}
   */
  getTargetUrl: function (core, topic) {
    if (window['websocket_host'] !== undefined) {
      return window['websocket_host'] + '/websocket/bidInfoServer/' + core + '/' + topic
    }
    var target = '/websocket/bidInfoServer/' + core + '/' + topic
    var host = window.location.host
    if (window.BASE_API_URL.startsWith('http://') || window.BASE_API_URL.startsWith('https://')) {
      host = window.BASE_API_URL.replace('http://', '').replace('https://', '')
    }
    if (window.location.protocol === 'http:') {
      return 'ws://' + host + target
    } else {
      return 'wss://' + host + target
    }
  },
  connect: function (core, topic, aticket, messageCallback, closeCallback) {
    var target = ApexWebSocket.getTargetUrl(core, topic) + '/' + aticket
    if ('WebSocket' in window) {
      ApexWebSocket.ws = new WebSocket(target)
    } else if ('MozWebSocket' in window) {
      ApexWebSocket.ws = new MozWebSocket(target)
    } else {
      alert('您的浏览器不支持WebSocket.')
      return
    }
    ApexWebSocket.ws.onopen = function () {
      Base.Logger.info('WebSocket 链接已创建.')
    }
    ApexWebSocket.ws.onmessage = function (event) {
      // log('Received: ' + event.data);
      if (typeof messageCallback === 'function') {
        try {
          var json = $.parseJSON(event.data)
          if (json.success) {
            messageCallback(json.data)
          }
        } catch (e) {
          Base.Logger.error(e)
        }
      }
    }
    ApexWebSocket.ws.onclose = function (event) {
      Base.Logger.info('WebSocket 链接关闭, Code: ' + event.code + (event.reason == '' ? '' : ', Reason: ' + event.reason))
      // if(!!!ApexWebSocket.onclose){
      //    ApexWebSocket.onclose = true;
      //    Base.Logger.info("WebSocket 链接关闭,不进行回调操作。");
      //    return false;//手动关闭
      // }
      if (typeof messageCallback === 'function') {
        Base.Logger.info('WebSocket 进行回调 ')
        setTimeout(function () {
          closeCallback(event)
        }, 500)
      }
    }
  },
  isClosed: function () {
    /**
     * readyState 说明：
     *     0        CONNECTING        连接尚未建立
     *     1        OPEN            WebSocket的链接已经建立
     *     2        CLOSING            连接正在关闭
     *     3        CLOSED            连接已经关闭或不可用
     */
    return ApexWebSocket.ws == null || ApexWebSocket.ws.readyState === 3
  },
  close: function (triggerOnclose) {
    ApexWebSocket.onclose = triggerOnclose
    if (!ApexWebSocket.isClosed()) {
      return ApexWebSocket.ws.close()
    }
  }

}
