<template>
  <div class="complainManage">
    <dataTable :theData="theData" :theContent="theContent" :theHeader="theHeader"></dataTable>
  </div>
</template>

<script>
import dataTable from '../common/components/dataTable.vue'
export default {
  data() {
    return {
      theData: [{
        id: '2',
        publisher: '123',
        category: '买入',
        amount: '7.568',
        price: '59.93',
        limitPrice: '400-1200',
        totalPrice: '400',
        publishTime: '2018-07-22 17:20:05',
        complainMan: '123',
        complainReason: '卖家未放币'
      },
      {
        id: '2',
        publisher: '123',
        category: '买入',
        amount: '7.568',
        price: '59.93',
        limitPrice: '400-1200',
        totalPrice: '400',
        publishTime: '2018-07-22 17:20:05',
        complainMan: '123',
        complainReason: '卖家未放币'
      }],
      theHeader: '投诉管理',
      theContent: ['交易ID', '发布者', '类别', '数量', '单价', '限额', '金额', '发布时间', '投诉人', '投诉原因']
    }
  },
  name: 'App',
  components: {
    dataTable
  }
}
</script>

<style type="text/css" media="screen" scoped>
  .complainManage {
    width: 75vw;
    max-width: calc(100vw - 150px);
    margin: 20px auto;
  }
</style>