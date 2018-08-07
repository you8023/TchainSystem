<template>
  <div class="transactionManage">
    <dataTable :theHeader="theHeader"></dataTable>
  </div>
</template>

<script>
import dataTable from '../common/components/dataTable.vue'
export default {
  data() {
    return {
      theHeader: '交易管理'
    }
  },
  name: 'App',
  components: {
    dataTable
  }
}
</script>

<style type="text/css" media="screen" scoped>
  .transactionManage {
    width: 75vw;
    max-width: calc(100vw - 150px);
    margin: 20px auto;
  }
</style>