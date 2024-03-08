<template>
  <section class="wrapper">
    <div class="illust-box" v-loading="loading">
      <h2 class="title" v-text="i18n.title"></h2>
      <ul class="illust-content">
        <li class="illust"
          v-for="(item, index) in newWorkPictures"
          :key="index">
          <picture-box
            :item="item"
            :picture-height="258"
            :picture-width="225"
          />
        </li>
      </ul>
    </div>
    <div class="pagination">
      <el-pagination
        style="justifyContent: center;"
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :total="total"
        :page-size="pageSize"
        @current-change="onCurrentPageChange"
      />
    </div>
  </section>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { Yixiv } from '@/views/engine';
import pictureBox from './components/pictureBox.vue';
import { IPublicPictureParams } from '@/views/types/Yixiv';
import { yixivStore } from "@/stores";

const { setNavigationBarActiveIndex } = yixivStore();
setNavigationBarActiveIndex(1);

const i18n = {
  title: '#最新插画'
};

const loading = ref<boolean>(false);
const newWorkPictures = ref<any[]>([]);
const getNewWorks = async() => {
  loading.value = true;
  const params: IPublicPictureParams = {
    sort: 'new',
    offset: currentPage.value - 1,
    limit: pageSize,
  };
  try {
    const { count, rows } = await Yixiv.getPublicPicture(params);
    newWorkPictures.value = rows.map((item: any) => {
      item.regular_url = item.regular_url + '?x-oss-process=image/resize,w_450';
      return item;
    });
    total.value = count;
    loading.value = false;
  } catch (error) {
    /** */
  }
};

const pageSize = 30;
const currentPage = ref<number>(1);
const total = ref<number>(0);

const onCurrentPageChange = (value: number) => {
  currentPage.value = value;
  getNewWorks();
};

getNewWorks();
</script>
<style lang="less" scoped>
@import './style/global.less';

.wrapper {
  margin: 0 auto;
  width: @contentWidth;

  .illust-box {
    margin-top: 45px;
    min-height: 200px;
    .title {
      font-size: 20px;
      line-height: 28px;
      color: rgba(0,0,0,.64);
      font-weight: 700;
      margin: 0 0 12px;
    }

    .illust-content {
      display: flex;
      padding: 0;
      flex-wrap: wrap;
      margin: -12px;
      list-style: none;
      .illust {
        width: 225px;
        margin: 12px;
      }
    }
  }

  .pagination {
      padding: 60px 0 20px;
    }
}
</style>
