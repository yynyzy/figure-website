<template>
  <div class="no-works">
    <i class="fa fa-search" />
    <h3 class="title" v-text="i18n.noWorks"></h3>
  </div>
</template>

<script setup lang='ts'>
const i18n = {
  noWorks: '没有作品',
}
</script>
<style lang="less" scoped>
.no-works {

  i {
    font-size: 54px;
    height: 72px;
    color: rgba(0,0,0,.16);
  }

  .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    color: rgba(0,0,0,.16);
  }
}
</style>
