<template>
  <div id="app">
    <sideBar v-if="isShowSideBar"></sideBar>
    <div id="main" ref="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sideBar from './views/common/components/sideBar.vue'
export default {
  name: 'App',
  components: {
    sideBar
  },
  data() {
    return {
      isShowSideBar: false
    }
  },
  mounted() {
    if (this.$route.path == '/login' || this.$route.path == 'login') {
      this.$refs.main.style.width = '100%';
      this.$refs.main.style.maxWidth = '100%';
      this.isShowSideBar = false;
    } else {
      this.$refs.main.style.width = '85vw';
      this.$refs.main.style.maxWidth = 'calc(100vw - 150px)';
      this.isShowSideBar = true;
    };
  },
  watch: {
    '$route'(to, from) {
      console.log(this.$route.path);
      if (this.$route.path == '/login' || this.$route.path == 'login') {
        this.$refs.main.style.width = '100%';
        this.$refs.main.style.maxWidth = '100%';
        this.isShowSideBar = false;
      } else {
        this.$refs.main.style.width = '85vw';
        this.$refs.main.style.maxWidth = 'calc(100vw - 150px)';
        this.isShowSideBar = true;
      };
    }
  }
}
</script>

<style>

@font-face {font-family: "iconfont";
  src: url('./views/common/icon/iconfont.eot?t=1532266627231'); /* IE9*/
  src: url('./views/common/icon/iconfont.eot?t=1532266627231#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('./views/common/icon/iconfont.ttf?t=1532266627231') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('./views/common/icon/iconfont.svg?t=1532266627231#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-tuichu:before { content: "\e602"; }
.icon-mai:before { content: "\e662"; }
.icon-mai1:before { content: "\e663"; }
.icon-yonghu:before { content: "\e636"; }
.icon-icon:before { content: "\e509"; }
.icon-mima:before { content: "\e627"; }
.icon-yonghu1:before { content: "\e62b"; }
.icon-shanchu:before { content: "\e62e"; }
.icon-bianji:before { content: "\e605"; }
.icon-tousu:before { content: "\e677"; }
.icon-suodingD:before { content: "\e606"; }

* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
}
#main {
    width: 100%;
    max-width: 100%;
    min-width: 700px;
    height: 100%;
    position: absolute;
    right: 0;
    background: #F2F1F6;
}
</style>
