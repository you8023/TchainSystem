<template>
  <div class="dataTable">
    <div id="headAndSearch">
      <h1>{{theHeader}}</h1>
      <select v-model="coinChoose" @change="changeCoin">
        <option v-for="(item, index) in coinList" :value="item.value">{{item.abName}}</option>
      </select>
      <div id="search">
          <button type="button" @click="searchById"><img src="../../../assets/search.png" alt="搜索"></button>
          <input type="text" name="ID" value="" :placeholder="searchPlh" ref="searchKey">
          <div id="searchSort" v-if="isShowSearchSort">
            <button type="button" @click="searchIsId = !searchIsId; searchPlh = '输入用户名搜索'" :class="searchIsId? '':'chosenSort'">用户名</button>
            <button type="button" @click="searchIsId = !searchIsId; searchPlh = '输入订单号搜索'" :class="searchIsId? 'chosenSort':''">订单号</button>
          </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="item in theContent">{{item}}</th>
          <th v-if="isShowBtn">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in theData" :key="index">
          <td v-for="i in Object.keys(item)">{{item[i]}}</td>
          <td v-if="isShowBtn">
            <button type="button" @click="deleteData(index)">
              <i class="iconfont icon-shanchu"></i>
            </button>
            <button type="button" v-if="isShowEdit">
              <i class="iconfont icon-bianji"></i>
            </button>
            <button type="button" v-if="isShowBlock">
              <i class="iconfont icon-suodingD"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="splitPage">
      <nav aria-label="Page navigation">
        <button type="button" v-if="isShowAddBtn">添加</button>
        <ul class="pagination">
          <li class="disabled">
            <a href="javascript:void(0);" aria-label="Previous" @click="turnByPage">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li><a href="javascript:void(0);" @click="turnByPage">前五页</a></li>
          <li><a href="javascript:void(0);" @click="turnByPage" class="pageNum theIndex">1</a></li>
          <li><a href="javascript:void(0);" @click="turnByPage" class="pageNum">2</a></li>
          <li><a href="javascript:void(0);" @click="turnByPage" class="pageNum">3</a></li>
          <li><a href="javascript:void(0);" @click="turnByPage" class="pageNum">4</a></li>
          <li><a href="javascript:void(0);" @click="turnByPage" class="pageNum">5</a></li>
          <li><a href="javascript:void(0);" @click="turnByPage">后五页</a></li>
          <li>
            <a href="javascript:void(0);" aria-label="Next" @click="turnByPage">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShowBtn: false,
        isShowEdit: false,
        isShowBlock: false,
        isShowAddBtn: false,
        theData: [],
        theContent: [],
        page: 0,
        limit: 10,
        totalPage: 1,
        searchChoose: 1,
        searchUserChos: 3,
        searchPlh: '输入订单号搜索',
        searchIsId: true,
        isShowSearchSort: true,
        searchApi: '',
        getDataApi: '',
        coinChoose: '',
        coinList: [
        {
          name: '唐人链',
          abName: 'TRC',
          value: ''
        },
        {
          name: '比特币',
          abName: 'BTC',
          value: 1
        },
        {
          name: 'Bitcoin Cash',
          abName: 'BCC',
          value: 2
        },
        {
          name: '以太币',
          abName: 'ETH',
          value: 3
        },
        {
          name: '柚子币',
          abName: 'EOS',
          value: 4
        }]
      }
    },
    props: ['theHeader'],
    mounted () {
      this.init();
    },
    methods: {
      init: function () {
        // 初始化参数
        var that = this;
        this.theData = [];
        switch(this.theHeader) {
          case '交易管理':
            this.getDataApi = that.$ip + '/deal2' + this.coinChoose + '?choose=2&page=' + (this.page * this.limit) + '&limit=' + this.limit;
            this.isShowBtn = false;
            this.searchChoose = 1;
            this.searchPlh = '输入订单号搜索';
            this.isShowSearchSort = true;
            this.searchUserChos = 3;
            break;
          case '买入管理':
            this.getDataApi = that.$ip + '/hang_sell/0' + this.coinChoose + '?choose=1&page=' + (this.page * this.limit) + '&limit=' + this.limit;
            this.isShowBtn = false;
            this.searchChoose = 0;
            this.searchPlh = '输入订单号搜索';
            this.isShowSearchSort = false;
            this.searchUserChos = 1;
            break;
          case '卖出管理':
            this.getDataApi = that.$ip + '/hang_sell/0' + this.coinChoose + '?choose=0&page=' + (this.page * this.limit) + '&limit=' + this.limit;
            this.isShowBtn = false;
            this.searchChoose = 0;
            this.searchPlh = '输入订单号搜索';
            this.isShowSearchSort = false;
            this.searchUserChos = 0;
            break;
          case '用户管理':
            this.limit = 8;
            this.getDataApi = that.$ip + '/deal1?choose=2&page=' + (this.page * this.limit) + '&limit=' + this.limit;
            this.isShowBtn = false;
            this.isShowEdit = false;
            this.isShowBlock = false;
            this.isShowAddBtn = true;
            this.searchPlh = '输入用户名搜索';
            this.isShowSearchSort = false;
            break;
          default:
            this.isShowBtn = false;
            break;
        }
        this.getData(this.getDataApi);
      },
      getData: function (theUrl) {
        // 数据分流
        switch(this.theHeader) {
          case '交易管理':
            this.getTradeData(theUrl);
            break;
          case '买入管理':
            this.getBuyData(theUrl);
            break;
          case '卖出管理':
            this.getSellData(theUrl);
            break;
          case '用户管理':
            this.getUserData(theUrl);
            break;
          default:
            this.isShowBtn = false;
            break;
        }
      },
      changeCoin: function () {
        console.log(this.coinChoose);
        this.init();
      },
      searchById: function () {
        // 搜索
        if (this.$refs.searchKey.value=='') {
          alert('请输入搜索内容！');
        } else {
          var that = this;
          // 按订单或用户名搜索
          that.searchApi = that.searchIsId? this.$ip + '/search' + this.coinChoose + '?ID=' + this.$refs.searchKey.value + '&choose=' + this.searchChoose:this.$ip + '/deal2' + this.coinChoose + '?choose=' + this.searchUserChos + '&name=' + this.$refs.searchKey.value + '&page=' + (this.page * this.limit) + '&limit=' + this.limit;
          if (this.theHeader=='用户管理') {
            // 搜索用户信息
            that.searchApi = this.$ip + '/deal1?choose=1&name=' + this.$refs.searchKey.value + '&page=' + (this.page * this.limit) + '&limit=' + this.limit;
          };
          this.getData(this.searchApi);
        };
        
      },
      deleteData: function (index) {
        // 删除用户
        if(this.theHeader == '用户管理' && confirm('确认删除用户' + this.theData[index].username + '吗？')) {
          this.$ajax(this.$ip + '/deal1?choose=0&name=' + this.theData[index].username + '&page=' + (this.page * this.limit) + '&limit=' + this.limit)
          .then(function (res) {
            res.data.code == 200? alert('删除成功！'):alert('删除失败！');
          })
          .catch(function (error) {
            alert('删除失败！' + error);
          });
        }
      },
      getTradeData: function (getDataUrl) {
        // 获取交易记录
        this.theContent = ['买家', '卖家', '数量', '单价', '总额', '类别', '完成时间'];
        this.theData = [];
        var that = this;
        this.$ajax(getDataUrl)
        .then(function (res) {
          that.totalPage = res.data.totalpage || 1;
          if (res.data.code==200) {
            var theJson = {};
            console.log(res);
            function createData (perData) {
              theJson = {
                buyer: perData.buyer_name? perData.buyer_name:(perData.type==0?that.$refs.searchKey.value:perData.oppsitename),
                seller: perData.seller_name? perData.seller_name:(perData.type==1?that.$refs.searchKey.value:perData.oppsitename),
                amount: perData.need_amount,
                price: perData.the_unit_price,
                totalPrice: ((perData.need_amount * 10) * (perData.the_unit_price * 10) / 100).toFixed(2),
                type: perData.type==0? '买入': '卖出',
                complishTime: that.$api.formatTime(perData.time_success)
              }
              return theJson;
            }
            if (res.data.data) {
              if (Array.isArray(res.data.data.info)) {
                for(var key of res.data.data.info) {
                  that.theData.push(createData(key));
                }
              } else {
                that.theData.push(createData(res.data.data.info));
              };
              that.checkPage();
            } else {
              alert(res.data.msg);
            };
            
          } else {
            alert('信息获取失败！');
          };
          
        })
        .catch(function (error) {
          alert('信息获取失败' + error);
        })
      },
      getBuyData: function (getDataUrl) {
        // 获取挂售买入信息
        this.theContent = ['交易ID', '发布者', '数量', '单价', '限额', '总额', '发布时间'];
        this.theData = [];
        console.log('getBuy');
        var that = this;
        this.$ajax(getDataUrl)
        .then(function (res) {
          that.totalPage = res.data.totalpage || 1;
          console.log(res);
          var theJson = {};
          for(var key of res.data.data.info){
            theJson = {
              id: key.id || that.$refs.searchKey.value,
              publisher: key.username,
              amount: key.amount,
              price: key.the_unit_price,
              limitPrice: key.the_lower_transaction,
              totalPrice: ((key.amount * 10) * (key.the_unit_price * 10) / 100).toFixed(2),
              publishTime: that.$api.formatTime(key.time?key.time:key.time_hang)
            }
            that.theData.push(theJson);
          }
          that.checkPage();
        })
        .catch(function (error) {
          alert('信息获取失败' + error);
        });
      },
      getSellData: function (getDataUrl) {
        // 获取挂售卖出信息
        this.theContent = ['交易ID', '发布者', '数量', '单价', '限额', '总额', '发布时间'];
        this.theData = [];
        var that = this;
        this.$ajax(getDataUrl)
        .then(function (res) {
          that.totalPage = res.data.totalpage || 1;
          console.log(res);
          var theJson = {};
          for(var key of res.data.data.info){
            theJson = {
              id: key.id || that.$refs.searchKey.value,
              publisher: key.username,
              amount: key.amount,
              price: key.the_unit_price,
              limitPrice: key.the_lower_transaction,
              totalPrice: ((key.amount * 10) * (key.the_unit_price * 10) / 100).toFixed(2),
              publishTime: that.$api.formatTime(key.time?key.time:key.time_hang)
            }
            that.theData.push(theJson);
          }
          that.checkPage();
        })
        .catch(function (error) {
          alert('信息获取失败' + error);
        });
      },
      getUserData: function (getDataUrl) {
        // 获取用户信息
        this.theContent = ['用户ID', '用户名', '真实姓名', '手机号', '公钥', '余额', 'TRC', 'BCC', 'BTC', 'EOS', 'ETH', '会员等级', '注册时间'];
        this.theData = [];
        var that = this;
        this.$ajax(getDataUrl)
        .then(function (res) {
          that.totalPage = res.data.totalpage || 1;
          console.log(res);
          function createData (key) {
            var theJson = {};
            theJson = {
                id: key.ID_card,
                username: key.username,
                realName: key.real_name,
                phone: key.phone,
                publicKey: key.public_key,
                remaining: key.remaining,
                Tang: key.Tang,
                BCC: key.BCC,
                BTC: key.BTC,
                EOS: key.EOS,
                ETH: key.ETH,
                vipLevel: key.vipLevel,
                regiestTime: that.$api.formatTime(key.regiestTime)
              }
              return theJson;
          }
          if (res.data.code==200) {
            if (res.data.data) {
              if (Array.isArray(res.data.data)) {
                for(var key of res.data.data){
                  that.theData.push(createData(key));
                }
              } else {
                that.theData.push(createData(res.data.data));
              };
            } else {
              alert(res.data.msg);
            };
            
          } else {
            alert('获取用户信息失败！');
          };
          that.checkPage();
        })
        .catch(function (error) {
          alert('获取用户信息失败！' + error);
        });
      },
      checkPage: function () {
        // 改变不可点击的按钮样式
        var allPageBtn = document.getElementsByClassName('pagination')[0].getElementsByTagName('li');
        for (var i = 0; i < allPageBtn.length; i++) {
          allPageBtn[i].className = '';
        };
        // 初始化
        // 前一页
        if (this.page==0) {
          allPageBtn[0].className = 'disabled';
        };
        // 前五页
        if (allPageBtn[2].innerText == 1) {
          allPageBtn[1].className = 'disabled';
        };
        // 下一页
        if (this.page >= this.totalPage-1) {
          allPageBtn[8].className = 'disabled';
        };
        // 后五页
        if (allPageBtn[6].innerText >= this.totalPage) {
          allPageBtn[7].className = 'disabled';
        };
        // 按钮页
        for (var i = 2; i < 7; i++) {
          if (allPageBtn[i].innerText > this.totalPage) {
            allPageBtn[i].className = 'disabled';
          };
        };
      },
      turnByPage: function (event) {
        // 分页
        var that = this;
        var pageBtns = document.getElementsByClassName('pageNum');
        switch(event.path[0].innerText) {
          case '«':
            if (that.page>0) {
              that.page--;
              if (parseInt(pageBtns[0].innerText) - 1 > that.page) {
                for (var i = 0; i < pageBtns.length; i++) {
                  pageBtns[i].innerText = parseInt(pageBtns[i].innerText) - 5;
                };
              };
            };
            break;
          case '前五页':
            if (that.page >= 5) {
              for (var i = 0; i < pageBtns.length; i++) {
                pageBtns[i].innerText = parseInt(pageBtns[i].innerText) - 5;
              };
              that.page = parseInt(pageBtns[0].innerText) - 1;
            };
            break;
          case '后五页':
          console.log(pageBtns[0].innerText);
            if (parseInt(pageBtns[4].innerText) < that.totalPage) {
              console.log('true');
              for (var i = 0; i < pageBtns.length; i++) {
                pageBtns[i].innerText = parseInt(pageBtns[i].innerText) + 5;
              };
              that.page = parseInt(pageBtns[0].innerText) - 1;
            };
            break;
          case '»':
            if (that.page + 1<that.totalPage) {
              that.page++;
              if (parseInt(pageBtns[4].innerText) - 1 < that.page) {
                for (var i = 0; i < pageBtns.length; i++) {
                  pageBtns[i].innerText = parseInt(pageBtns[i].innerText) + 5;
                };
              };
            };
            break;
          default:
            if(event.path[0].innerText){
              that.page = event.path[0].innerText - 1;
            }
            break;
        }
        for (var i = 0; i < pageBtns.length; i++) {
          pageBtns[i].className = 'pageNum';
          if (parseInt(pageBtns[i].innerText) - 1==that.page) {
            pageBtns[i].className += ' theIndex';
          };
        };
        this.init();
      }
    }
  }
</script>

<style type="text/css" media="screen" scoped>
  #headAndSearch {
    width: 75vw;
    height: 37px;
    margin: 0 auto;
    margin-top: 30px;
  }
  #headAndSearch h1 {
    font-size: 25px;
    padding: 0;
    float: left;
  }
  select {
    width: 120px;
    height: 25px;
    margin-left: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
  }
  select:focus {
    outline: none;
  }
  #search {
    width: 400px;
    height: 40px;
    float: right;
    position: relative;
  }
  #search form {
    width: 400px;
    height: 40px;
    float: right;
  }
  #search button {
    width: 30px;
    height: 30px;
    border: 0;
    background: transparent;
    float: right;
    cursor: pointer;
  }
  #search button img {
    width: 100%;
    height: 100%;
  }
  #search input {
    width: 350px;
    height: 20px;
    border: 1px solid #2FCCEB;
    padding: 5px;
    float: left;
  }
  #searchSort {
    width: 100px;
    height: 20px;
    position: absolute;
    top: -20px;
  }
  #searchSort button {
    width: 50px;
    height: 100%;
    border: 1px solid #2FCCEB;
    border-bottom: 0;
    background-color: #fff;
    color: #2FCCEB;;
  }
  .chosenSort {
    background-color: #2FCCEB !important;
    color: #fff !important;
  }
  table {
    width: 75vw;
    height: auto;
    margin: 10px auto;
    text-align: center;
    border-spacing: 0;
  }
  table tr {
    height: 30px;
  }
  table td,
  table th {
    padding: 5px;
  }
  thead th {
    background: #2FCCEB;
    text-align: center;
    color: #FFFFFF;
  }
  tbody tr {
    color: #000000;
  }
  tbody tr:nth-child(2n+1) {
    background: #FFFFFF;
  }
  tbody tr:nth-child(2n) {
    background: #F5F5F5;
  }
  table button {
    background: transparent;
    border: 0;
    cursor: pointer;
  }
  table button:hover {
    color: #2FCCEB;
  }
  #buttons button:hover {
    background: #1DCAD1;
  }
  #search input:focus,
  #search button:focus,
  table button:focus {
    outline: none;
  }
  .splitPage {
    /*width: 480px;*/
    /*width: 100%;*/
    height: 30px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .splitPage button {
    width: 80px;
    height: 30px;
    border: 0;
    border-radius: 7px;
    background: #2FCCEB;
    cursor: pointer;
    color: #FFFFFF;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
  }
  .splitPage button:hover {
    background: #1DCAD1;
  }
  .splitPage nav {
    height: 30px;
    text-align: center;
  }
  .pagination {
    margin: 0;
    display: inline-block;
    vertical-align: bottom;
    padding-left: 0;
    border-radius: 4px;
  }
  .pagination>li {
    display: inline;
  }
  .pagination>li>a {
    position: relative;
    float: left;
    padding: 3px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .pagination>li>a>span {
    color: inherit;
  }
  .disabled a{
    color: #777 !important;
    pointer-events: none;
    cursor: not-allowed;
    background-color: #fff !important;
    border-color: #ddd !important;
  }
  .pagination>li:first-child>a {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .pagination>li:last-child>a {
    margin-left: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .pagination a:hover {
    background: #F7F7F9;
  }
  .theIndex {
    background-color: #2FCCEB !important;
    color: #fff !important;
  }
</style>