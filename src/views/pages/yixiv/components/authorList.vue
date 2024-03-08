<template>
  <div class="wrapper">
    <div class="user-item" v-for="(item, index) in authorList" :key="index">
      <router-link class="link" :to="`/yixiv/author/${item.user_id}`">
        <div class="avatar">
            <img :src="item.avatar">
        </div>
        <div class="info">
          <div class="title">
            <h3 class="uname" v-text="i18n.uname"></h3>
            <span class="uid" v-text="item.user_id"></span>
          </div>
          <div class="desc" v-text="item.desc"></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang='ts'>
const i18n = {
  uname: 'p站画师：',
}
interface Props {
  authorList: any[]
}
defineProps<Props>();
</script>
<style lang="less" scoped>
@import '../style/global.less';

.wrapper {
  margin: 0 auto;
  width: @contentWidth;
  min-height: 500px;

  .user-item .link{
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
    margin-top: 35px;

    .avatar {
      float: left;
      width: 12.5%;

      img {
        width: 135px;
        height: 135px;
        border-radius: 135px;
      }
    }

    .info {
      width: 87.5%;
      float: left;

      .title {
        margin: 10px 0;
        display: flex;
        align-items: center;

        .uname {
          font-size: 1.17em;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
        }

        .uid {
          color: #888;
          margin-left: 15px;
        }
      }

      .desc {
        color: #888;
      }
    }
  }
}
</style>
