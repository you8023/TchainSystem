<template>
  <div class="otherManage">
    <div id="introRule">
      <h1>{{introName}}</h1>
      <select v-model="selectedIntroRule">
        <option v-for="(item, index) in ruleList" :value="item.value">{{item.name}}</option>
      </select>
      <button type="button" @click="saveRule">保存</button>
    </div>
    <div id="coinOnline">
      <h1>{{coinOnlineSort}}</h1>
      <div id="coins2select">
        <div class="coin" v-for="(item, i) in coinList" :key="i" @click="selectCoins(i)" :class="item.isSelected?'selected':''">
          <div class="selectedCoin" v-if="item.isSelected"></div>
          <img :src="item.img" :alt="item.name">
          <p>{{item.abName}}</p>
          <p>{{item.name}}</p>
        </div>
        <div id="clearFloat"></div>
      </div>
      <button type="button" @click="saveCoins">保存</button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        introName: '精选币推送依据',
        selectedIntroRule: 1,
        ruleList: [
        {
          value: '1',
          name: '一周内涨幅最高',
        },
        {
          value: '2',
          name: '一周内跌幅最高',
        },
        {
          value: '3',
          name: '单价最高',
        },
        {
          value: '4',
          name: '单价最低',
        }
        ],
        coinOnlineSort: '上线币种',
        coinList: [
        {
          img: require('../../assets/coins/coin-btc.png'),
          name: '比特币',
          abName: 'BTC',
          value: '',
          isSelected: true
        },
        {
          img: require('../../assets/coins/coin-bcc.png'),
          name: 'Bitcoin Cash',
          abName: 'BCC',
          value: '',
          isSelected: true
        },
        {
          img: require('../../assets/coins/coin-eth.png'),
          name: '以太币',
          abName: 'ETH',
          value: '',
          isSelected: true
        },
        {
          img: require('../../assets/coins/coin-eos.png'),
          name: '柚子币',
          abName: 'EOS',
          value: '',
          isSelected: true
        },
        {
          img: require('../../assets/coins/coin-bts.png'),
          name: '比特股',
          abName: 'BTS',
          value: '',
          isSelected: false
        },
        {
          img: require('../../assets/coins/coin-etc.png'),
          name: '以太经典',
          abName: 'ETC',
          value: '',
          isSelected: false
        },
        {
          img: require('../../assets/coins/coin-hsr.png'),
          name: 'hshare币',
          abName: 'HSR',
          value: '',
          isSelected: false
        },
        {
          img: require('../../assets/coins/coin-ltc.png'),
          name: '莱特币',
          abName: 'LTC',
          value: '',
          isSelected: false
        },
        {
          img: require('../../assets/coins/coin-qtum.png'),
          name: '量子币',
          abName: 'QTUM',
          value: '',
          isSelected: false
        },
        {
          img: require('../../assets/coins/coin-usdt.png'),
          name: '泰达币',
          abName: 'USDT',
          value: '',
          isSelected: false
        },
        {
          img: require('../../assets/coins/coin-neo.png'),
          name: '小蚁币',
          abName: 'NEO',
          value: '',
          isSelected: false
        },
        {
          img: require('../../assets/coins/coin-xuc.png'),
          name: '雪币',
          abName: 'XUC',
          value: '',
          isSelected: false
        },
        {
          img: require('../../assets/coins/coin-xrp.png'),
          name: '瑞波币',
          abName: 'XRP',
          value: '',
          isSelected: false
        },
        {
          img: require('../../assets/coins/coin-dash.png'),
          name: '达世币',
          abName: 'DASH',
          value: '',
          isSelected: false
        },
        {
          img: require('../../assets/coins/coin-doge.png'),
          name: '狗币',
          abName: 'DOGE',
          value: '',
          isSelected: false
        },
        {
          img: require('../../assets/coins/coin-xlm.png'),
          name: '恒星币',
          abName: 'XLM',
          value: '',
          isSelected: false
        },
        {
          img: require('../../assets/coins/coin-1st.png'),
          name: '第一滴血',
          abName: '1ST',
          value: '',
          isSelected: false
        }
        ]
      }
    },
    mounted() {
      var that = this;
      this.$ajax(this.$ip + '/show_coin')
      .then(function (res) {
        if (res.data.code==200) {
          that.selectedIntroRule = res.data.introCoinList[0].basis || 1;
        } else {
          alert('初始化数据失败！');
        };
      })
      .catch(function (error) {
        alert('初始化数据失败，请检查网络！')
      });
    },
    methods: {
      saveRule: function () {
        this.$ajax(this.$ip + '/set?choose=' + this.selectedIntroRule)
        .then(function (res) {
          res.data.code==200? alert('设置成功！'):alert('设置失败，请重试！');
        })
        .catch(function (error) {
          alert('设置失败！' + error);
        });
      },
      selectCoins: function (index) {
        console.log(index);
        this.coinList[index].isSelected = !this.coinList[index].isSelected;
      },
      saveCoins: function () {
        // body...
      }
    }
  }
</script>
<style type="text/css" media="screen" scoped>
  .otherManage {
    width: 75vw;
    max-width: calc(100vw - 150px);
    margin: 20px auto;
  }
  #introRule {
    margin-top: 30px;
  }
  h1 {
    font-size: 25px;
    padding: 0;
  }
  select {
    width: 180px;
    height: 30px;
    margin-top: 20px;
    border: 1px solid #ccc;
  }
  button {
    width: 100px;
    height: 30px;
    border: 0;
    line-height: 30px;
    background-color: #2FCBEA;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
    display: inline-block;
    vertical-align: bottom;
    margin-left: 10px;
  }
  button:hover {
    background-color: #1DC3E3;
  }
  select:focus,
  button:focus {
    outline: none;
  }
  #coinOnline {
    margin-top: 30px;
  }
  #coins2select {
    margin-top: 20px;
  }
  .coin {
    width: 150px;
    height: 40px;
    background-color: #fff;
    padding: 10px;
    cursor: pointer;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
  }
  .coin:hover {
    width: 148px;
    height: 38px;
    box-shadow: 3px 3px 3px #ccc;
    border: 1px solid #2FCBEA;
  }
  .coin img {
    width: 40px;
    height: 40px;
    display: block;
    float: left;
  }
  .coin p {
    width: 98px;
    display: block;
    float: left;
    padding-left: 10px;
    color: #646464;
    font-size: 16px;
  }
  .coin p:last-child {
    color: #878787;
    font-size: 14px;
  }
  #clearFloat{
    clear: both;
  }
  .selected {
    border: 1px solid #2FCBEA;
    width: 148px;
    height: 38px;
    box-shadow: 3px 3px 3px #ccc;
  }
  .selectedCoin {
    border-right: 10px solid #2FCBEA;
    border-bottom: 10px solid #2FCBEA;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  #coinOnline button {
    margin: 20px auto;
    display: block;
  }
</style>