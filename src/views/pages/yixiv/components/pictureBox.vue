<template>
  <div class="box">
    <el-image
      :style="{
        height: pictureHeight+ 'px',
        width: pictureWidth + 'px',
        borderRadius: '8px',
      }"
      :src="item.regular_url"
      fit="cover"
      lazy
      @click="onClickImage"
    />
    <div v-if="item.page_total > 1" class="page_total">
      <i class="far fa-clone" />
      <p v-text="item.page_total"></p>
    </div>
    <div class="img-info" :style="{width: pictureWidth + 'px'}">
      <div class="title">
        <router-link :to="`/yixiv/illust/${item.picture_id}`">{{ item.title }}</router-link>
      </div>
      <div class="favor"><i class="far fa-heart" />{{ item.like_total }}</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';

const router = useRouter();

interface Props {
  item: any
  pictureHeight?: number
  pictureWidth?: number
};
const props = withDefaults(defineProps<Props>(),{
  pictureHeight: 184,
  pictureWidth: 184,
});

const onClickImage = () => {
  const  { href } = router.resolve({ path: `/yixiv/illust/${props.item.picture_id}`});
  window.open(href, '_blank');
}
</script>
<style lang="less" scoped>
.box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  margin: 12px;
  padding: 0;

  .page_total {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 3px;
    border-radius: 0 0 0 4px;
    background-color: rgba(0,0,0,.4);
    line-height: 1;
    font-size: 12px;
    color: #fff;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;

    p {
      margin-left: 5px;
    }
  }
  .img-info {
    width: 100%;

    .title {
      display: flex;
      margin-top: 8px;

      a {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 22px;
        font-weight: 700;
        color: #000000e0;
        transition: color .2s ease 0s;
      }
    }

    .favor {
      font-size: 13px;
      color: #888;
      margin-top: 4px;

      i {
        margin-right: 8px;
      }
    }
  }
}
</style>
