import axios from 'axios'
import store from '../store/index'
import router from '../router/index'
import qs from 'qs'
// react 中使用antd  此处自定义
// import { message } from "antd";
// vue中使用element-ui 此处自定义
// import { Loading} from "element-ui";
// vue中使用mint-ui 此处自定义
import { Toast, MessageBox, Indicator } from 'mint-ui'

// 创建axios默认请求
// axios.defaults.baseURL = 'http://192.168.1.106/JMJ'
axios.defaults.baseURL = 'http://192.168.1.125/KuaiZi'
// 配置超时时间
axios.defaults.timeout = 100000
// 配置请求拦截
axios.interceptors.request.use(config => {
  if (
    config.url.indexOf('User') > 0 ||
    config.url.indexOf('APP_Discover') > 0 ||
    config.url.indexOf('Address') > 0 ||
    config.url.indexOf('APP_Shoppingcart') > 0 ||
    config.url.indexOf('APP_Message') > 0 ||
    config.url.indexOf('SetProdToCollect') > 0
  ) {
    if (
      config.url === '/api/Address/Add' ||
      config.url === '/api/Address/Edit' ||
      config.url === '/api/User/Register' ||
      config.url === '/api/User/CancellationOfOrder' ||
      config.url === '/api/User/WxAuthorizedLogin' ||
      config.url === '/api/User/WxBindingAccount' ||
      config.url === '/api/User/OrderComment' ||
      config.url.indexOf('UpdateForImage') > 0 ||
      config.url.indexOf('EditHeadImage') > 0 ||
      config.url === '/api/User/LoginByPhoneAndPwd' ||
      config.url === '/api/User/Forgot' ||
      config.url === '/api/APP_Product/AddUserShopingCart' ||
      config.url === '/api/APP_Product/ProductBuyNow' ||
      config.url === '/api/APP_Product/EditOrderPord'
    ) {
      return config
    } else {
      if (store.state.token || localStorage.getItem('token')) {
        // 如果token存在 给请求设置token
        config.params.Token = store.state.token || localStorage.getItem('token')
        return config
      } else {
        MessageBox('温馨提示', '您还未登录')
        setTimeout(() => {
          window.location.href = '#/author'
        }, 1000)
      }
    }
  } else {
    // 如果当前页面不在以上判断 说明不需要token
    return config
  }
})
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.data.Status === 1) {
      return response
    } else if (response.data.Status === 40001) {
      Toast('登录失效')
      localStorage.setItem('firstURL', location.href.split('#')[1])
      setTimeout(() => {
        window.location.href = '#/author'
      }, 1000)
    } else if (response.data.Status === -1) {
      if (response.data.Result.res === '账户余额不足') {
        MessageBox('错误', '账户余额不足')
        setTimeout(() => {
          MessageBox.close(false)
        }, 3000)
      } else {
        MessageBox('错误', response.data.Result)
        setTimeout(() => {
          MessageBox.close(false)
        }, 3000)
      }
    } else if (
      response.data.Result === '您不是新用户,不可参与每周免单,点击立即开团免单'
    ) {
      MessageBox.confirm('', {
        message: response.data.Result,
        confirmButtonText: '去开团'
      }).then(action => {
        let urLink = localStorage
          .getItem('openFreeWeekLink')
          .split('&headid')[0]
          .replace('/goods/goodsdetail/2', '/goods/goodsdetail/0')
        router.push(urLink)
        router.go(0)
      })
    } else {
      // '哎呦，手滑了呢<br>'
      MessageBox('错误', response.data.Result)
      setTimeout(() => {
        MessageBox.close(false)
      }, 3000)
    }
  },
  function (error) {
    // 对响应错误做点什么
    MessageBox(
      '警告',
      '<span style="color:red;">服务器错误！</span>' +
        '<span style="color:red;">' +
        error +
        '</span>'
    )
    // setTimeout(() => {
    //   MessageBox.close(false)
    // }, 2000)
    return Promise.reject(error)
  }
)
/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 * this.$http.get('http://api.nihaotop.com/api/Home/PCInfo',
    {
      'pageIndex': 1,
      'pageSize': 100,
      'status': -1
    })
 */
var get = function (url, param, loading) {
  return new Promise((resolve, reject) => {
    // { params: param }
    // if (loading) {
    axios
      .get(url, { params: param })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参数，是否需要加载层
 */
var post = function (url, data) {
  return new Promise((resolve, reject) => {
    Indicator.open()
    axios
      .post(url, qs.stringify(data))
      .then(res => {
        Indicator.close()
        resolve(res.data)
      })
      .catch(err => {
        Indicator.close()
        reject(err)
      })
  })
}
var postUpload = function (url, data) {
  return new Promise((resolve, reject) => {
    // qs.stringify(data)
    /**
     * 如果是上传图接口，不能使用qs.stringify()
     * formdata外的参数直接挂在请求后?type=0
      _this.$http.post('http://yc.nbxuanma.com/api/Photo/UpdateForImage?type=0', formdata)
    */
    axios
      .post(url, data)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export default { get, post, postUpload }
