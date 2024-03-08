<template>
  <main class="wrapper">
    <div class="cover">
      <el-image class="img" :src="periodical.cover" fit="cover" lazy />
    </div>
    <div class="info">
      <div class="label">{{ i18n.label }}</div>
      <div class="date">{{ periodical.create_date }}</div>
    </div>
    <h1 class="title">{{ periodical.title }}</h1>

    <div class="illust-list">
      <div class="illust" v-for="(item, index) in periodical.pictures" :key="index">
        <router-link  :to="`/yixiv/illust/${item.picture_id}`">
          <el-image class="img" :src="item.original_url" fit="cover" lazy />
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { yixivStore } from '@/stores';
import { Yixiv } from '@/views/engine';
import { IGetPeriodical } from '@/views/types/Yixiv';


const { setNavigationBarActiveIndex } = yixivStore();
setNavigationBarActiveIndex(3);

const i18n = {
  label: '插画'
};
const route = useRoute();
const getRouteParams = () => {
  const { periodicalId } = route.params;
  return Array.isArray(periodicalId) ? periodicalId[0] : periodicalId;
};

const getPeriodical = async(periodicalId: string) => {
  const params: IGetPeriodical = {
  periodicalId,
  offset: 0,
  limit: 20
}
  try {
    const periodicals = await Yixiv.getPeriodical(params);
    return periodicals;
  } catch (error) {
    /** */
  }
};

interface IPeriodical {
  cover: string
  create_date: string
  title: string
  pictures: any[]
  [key: string]: any
};

const periodical = ref<IPeriodical>({
  cover: '',
  create_date: '',
  title: '',
  pictures: [],
});

const init = async () => {
  const periodicalId = getRouteParams();
  const  data = await getPeriodical(periodicalId);
  periodical.value = data;
};
init();

</script>
<style lang="less" scoped>
@import './style/global.less';

.wrapper {
  width: 100%;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 10px;

  .cover {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .info {
    display: flex;
    justify-content: space-between;
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 12px;
    padding-top: 24px;

    .label {
      font-size: 10px;
      padding: 3px 11px;
      display: inline-block;
      line-height: 14px;
      text-align: center;
      letter-spacing: 0;
      color: #fff;
      min-width: 62px;
      border: 1px solid @color1;
      color: @color1;
    }

    .date {
      letter-spacing: .05em;
      font-size: 12px;
      font-weight: 700;
      color: #9a9a9a;
    }
  }

  .title {
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 22px;
    font-size: 20px;
    font-weight: 700;
    color: #4a4a4a;
    letter-spacing: 0;
    line-height: 32px;
  }
}
</style>
