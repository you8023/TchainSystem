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

  static alert(type, msg) {
    var theDiv = document.createElement('div');
    var theP = document.createElement('p');
    var theMsg = msg || '';
    var textNode = document.createTextNode(theMsg);
    theP.appendChild(textNode);
    theDiv.appendChild(theP);
    theDiv.style.cssText = 'height: 22px; position: absolute; margin: 0 auto; top: 30px; left: 0; right: 0; bottom: 0; box-shadow: 3px 3px 3px #ccc; border-radius: 5px; z-index: 9999; width: fit-content; width: -webkit-fit-content; width: -moz-fit-content; padding: 7px; opacity: .8; transition: opacity 1s;';
    theP.style.cssText = 'display: inline; color: #fff; font-size: 14px;';
    switch(type) {
      case 'error':
        theDiv.style.cssText += 'background: #E44C3F;'
        break;
      case 'warning':
        theDiv.style.cssText += 'background: #F49A10;'
        break;
      case 'success':
        theDiv.style.cssText += 'background: #26AA60;'
        break;
      default:
        theDiv.style.cssText += 'background: #3199DA;'
        break;
    }
    var theBody = document.getElementsByTagName('body')[0];
    theBody.appendChild(theDiv);
    setTimeout(function () {
      theDiv.style.opacity = 0;
      setTimeout(function () {
        theBody.removeChild(theDiv);
      }, 800);
    }, 1000);
    
  }
 }

export default {
  install(Vue) {
    Vue.prototype.$api = Api;
    Vue.prototype.$ajax = ajax;
    Vue.prototype.$ip = 'http://118.24.113.39:5000';
  }
}
