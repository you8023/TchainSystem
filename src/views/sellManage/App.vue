<template>
  <div class="sellManage">
    <dataTable :theHeader="theHeader"></dataTable>
  </div>
</template>

<script>
import dataTable from '../common/components/dataTable.vue'
export default {
  data() {
    return {
      theHeader: '卖出管理',
    }
  },
  name: 'App',
  components: {
    dataTable
  }
}
</script>

<style type="text/css" media="screen" scoped>
  .sellManage {
    width: 75vw;
    max-width: calc(100vw - 150px);
    margin: 20px auto;
  }
</style>