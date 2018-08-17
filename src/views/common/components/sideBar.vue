<template>
  <div class="navigation" v-if="isShowNav">
    <div id="sideBar">
      <div id="dark">
      </div>
      <div id="portrait">
        <img src="../../../assets/portrait.jpg" alt="">
      </div>
      <p>{{adminName}}</p>
      <div id="routers">
            <router-link v-for="(route, index) in routers" :key="index" :to="route.link">
              <i class="iconfont" :class="route.icon"></i>
              <span>{{route.name}}</span>
            </router-link>
            <a @click="loginOut">
              <i class="iconfont icon-tuichu"></i>
              <span>退出登录</span>
            </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sideBar',
    data() {
      return {
        isShowNav: true,
        adminName: '管理员',
        routers: [
        {
          name: '交易管理',
          link: 'transactionManage',
          icon: 'icon-icon'
        },
        {
          name: '买入管理',
          link: 'buyManage',
          icon: 'icon-mai'
        },
        {
          name: '卖出管理',
          link: 'sellManage',
          icon: 'icon-mai1'
        },
        {
          name: '用户管理',
          link: 'userManage',
          icon: 'icon-yonghu1'
        },
        {
          name: '其他管理',
          link: 'otherManage',
          icon: 'icon-tousu'
        }
        // {
        //   name: '退出登录',
        //   link: 'login',
        //   icon: 'icon-tuichu'
        // }
        ]
      }
    },
    methods: {
      loginOut: function () {
        var that = this;
        this.$ajax(this.$ip + '/logout')
        .then(function (res) {
          res.data.code == 200 ? that.$router.push("/login") : alert("退出登录失败");
        })
        .catch(function (error) {
          alert("退出登录失败" + error);
        });
      }
    }
  }
</script>
<style type="text/css" media="screen" scoped>
  * {
    margin: 0 auto;
    padding: 0;
    /*overflow-y: hidden;*/
    list-style: none;
  }
  a,
  i,
  span,
  a:hover {
    text-decoration: none;
    color: #666;
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size: 18px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .navigation {
    min-width: 150px;
    width: 15vw;
    height: 100%;
    position: absolute;
    left: 0;
    float: left;
  }
  #sideBar {
    min-width: 150px;
    width: 15vw;
    height: 100%;
    position: fixed;
    left: 0;
    z-index: 999;
    display: inline-block;
    background: #fff;
    text-align: center;
    border-right: 1px solid #ccc;
    /*overflow: visible;*/
  }
  #dark {
    background: #2FCCEB;
    width: 100%;
    height: 60px;
  }
  #portrait {
    width: 64px;
    height: 64px;
    position: relative;
    left: 0;
    right: 0;
    top: -30px;
    background: #FFFFFF;
    border-radius: 50%;
  }
  #portrait img {
    width: 60px;
    height: 60px;
    position: relative;
    top: 2px;
    border-radius: 50%;
  }
  #sideBar p {
    font-size: 20px;
    color: #666;
  }
  #routers {
    margin-top: 30px;
  }
  #sideBar a {
    display: block;
    width: 15vw;
    min-width: 150px;
    height: 40px;
    margin-bottom: 3px;
    color: #FFFFFF;
    cursor: pointer;
  }
  #sideBar a:hover,
  #sideBar a:hover span,
  #sideBar a:hover i,
  .router-link-active,
  .router-link-active span,
  .router-link-active i {
    background-color: #2FCCEB;
    color: #fff;
  }
  #sideBar a:hover,
  .router-link-active {
    box-shadow: 0 3px 3px #ccc;
  }
  /*#sideBar a:hover:after,*/
  .router-link-active:after {
    content: '';
    width: 0;
    height: 0;    
    position: absolute;
    right: -20px;
    border-left: 20px solid #2FCCEB;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    z-index: 9;
  }
  #sideBar i {
    display: inline;
    line-height: 40px;
  }
  #sideBar a {
    font-size: 16px;
    line-height: 40px;
  }
</style>