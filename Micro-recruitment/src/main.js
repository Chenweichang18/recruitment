import Vue from 'vue'
import App from './App'
import animate from 'animate.css'
import Fly from 'flyio/dist/npm/wx'
Vue.use(animate)
Vue.config.productionTip = false
App.mpType = 'app'

//flyio的全局配置、拦截器
const fly = new Fly()
const host = process.env.NODE_ENV === "development"? "http://localhost:3000" : "http://localhost:3000"
fly.config.baseURL =  host
fly.config.headers = {
  "X-Tag": "flyio",
  'content-type': 'application/json',
  'Authorization': '',
  'sign': ""
} //设置你的请求头

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  wx.showLoading({
    title: "加载中",
    mask: true
  });

  return request;
});

// 添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading();
    return response;// 请求成功之后将返回值返回
  },
  (err) => {
    // 请求出错，根据返回状态码判断出错原因
    console.log(err);
    wx.hideLoading();
    if (err) {
      return "请求失败";
    };
  }
);
Vue.prototype.$http=fly //将fly实例挂在vue原型上
const app = new Vue(App)
app.$mount()
