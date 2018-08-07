<template>
  <div class="login">
    <div id="loginDiv">
      <div id="headDiv">
        <h3>后台登录</h3>
        <p>Login To System</p>
      </div>
      <div id="loginInput">
        <div class="inputDiv">
          <i class="iconfont icon-yonghu"></i>
          <input type="text" v-model="username" value="" placeholder="请输入账号">
        </div>
        <div class="inputDiv">
          <i class="iconfont icon-mima"></i>
          <input type="password" v-model="psd" value="" placeholder="请输入密码">
        </div>
        <input type="button" name="" value="立即登录" @click="login">
      </div>
    </div>
    <div id="bottom">
        <div class="waveTop"></div>
        <div class="waveMid"></div>
        <div class="waveBot"></div>
    </div>
  </div>
</template>
<style type="text/css" media="screen" scoped>
  @keyframes moveWave {
    0% {
      transform: translateX(0) translateZ(0) scaleY(1);
    }
    50% {
      transform: translateX(-25%) translateZ(0) scaleY(0.45);
    }
    100% {
      transform: translateX(-50%) translateZ(0) scaleY(1);
    }
  }
  .login {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, #80B5E8 20%, #BDE3FE 80%);
    background-image: -webkit-linear-gradient(bottom, #80B5E8 20%, #BDE3FE 80%); /* Safari 5.1 to 6.0 */
    background-image: -o-linear-gradient(top, #80B5E8 20%, #BDE3FE 80%); /* Opera 11.1 to 12.0 */
    background-image: -moz-linear-gradient(top, #80B5E8 20%, #BDE3FE 80%); /* Firefox 3.6 to 15 */
  }
  #loginDiv {
    width: 400px;
    height: 330px;
    margin: 0 auto;
    margin-top: 20vh;
    background: #fff;
    border-radius: 10px;
    position: relative;
    z-index: 99;
  }
  #headDiv {
    width: 100%;
    height: 130px;
    background: #1288FB;
    text-align: center;
    color: #fff;
    -moz-border-radius-topleft: 5px;
    -moz-border-radius-topright: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
  }
  #headDiv h3 {
    padding-top: 30px;
    font-size: 25px;
  }
  #headDiv p {
    font-size: 14px;
  }
  #loginInput {
    width: 250px;
    height: 200px;
    margin: 20px auto;
  }
  .inputDiv {
    width: 270px;
    height: 25px;
    margin-top: 20px;
  }
  #loginInput input {
    width: 230px;
    height: 25px;
    border: 0;
    border-bottom: 1px solid #ccc;
  }
  .iconfont {
    color: #8BAEC9;
    font-size: 20px;
    line-height: 25px;
    padding-right: 5px;
    display: inline-block;
    vertical-align: middle;
  }
  #loginInput input:focus {
    /*border: 0;*/
    outline: 0;
  }
  #loginInput input:nth-child(3) {
    width: 150px;
    height: 35px;
    display: block;
    margin: 30px auto;
    background: #5AA5F9;
    color: #fff;
    border: 0;
    border-radius: 20px;
    cursor: pointer;
  }
  #loginInput input:nth-child(3):hover {
    background: #1288FB;
    box-shadow: 0 4px 5px #AAD9FF;
  }
  #bottom {
    width: 100%;
    height: 30vh;
    position: absolute;
    bottom: 0;
    overflow: hidden;
  }
  .waveTop {
    width: 200%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: moveWave 8.5s linear infinite;
    background: url('../../assets/top.png');
    background-position: 0 bottom;
    background-repeat: repeat no-repeat;
    background-size: 50% 15vh;
    transform-origin: center bottom;
    animation-delay: 1s;
  }
  .waveMid {
    width: 200%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: moveWave 12s linear infinite;
    background: url('../../assets/mid.png');
    background-size: 50% 16vh;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
  }
  .waveBot {
    width: 200%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: moveWave 20s linear infinite;
    background: url('../../assets/bot.png');
    background-size: 50% 15vh;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
  }
</style>
<script>
  export default {
    data() {
      return {
        username: '',
        psd: ''
      }
    },
    components: {},
    methods: {
      login: function () {
        var user = {
          username: this.username,
          password: this.psd
        };
        var that = this;
        this.$ajax.post(that.$ip + '/login', user)
        .then(function (res) {
          res.data.code==200?that.getUserInfo():alert('登录失败');
        })
        .catch(function (error) {
          alert('登录失败：'+error);
        });
      },
      getUserInfo: function () {
        var that = this;
        this.$ajax(that.$ip + '/show_me')
        .then(function (res) {
          res.data.code==200?that.saveUserData(res):alert('获取管理员信息失败！');
        })
        .catch(function (error) {
          alert('获取管理员信息失败：'+error);
        });
      },
      saveUserData: function (data) {
        if (data) {
          sessionStorage.setItem('userData', JSON.stringify(data));
          this.$router.push('/transactionManage');
        };
      }
    }
  }
</script>