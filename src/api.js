import axios from 'axios'

const ajax = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:3001' : 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded'
  },
  withCredentials : true,
  timeout: 25000 // 请求超时时间
});
 class Api {
  static formatTime(theTime) {
    var result = 'null';
    if (theTime) {
      var arr = theTime.split(' ');
      var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      month.forEach(function (value, index, array) {
        if (value==arr[2]) {
          arr[2] = (index + 1)<10? '0' + (index+1):(index+1);
        };
      });
      result = arr[3] + '-' + arr[2] + '-' + arr[1] + ' ' + arr[4];
    }
    return result;
    // console.log(arr.getYear()+ arr.getMonth() + arr.getDay());
  }
 }

export default {
  install(Vue) {
    Vue.prototype.$api = Api;
    Vue.prototype.$ajax = ajax;
    Vue.prototype.$ip = 'http://118.24.113.39:5000';
  }
}
