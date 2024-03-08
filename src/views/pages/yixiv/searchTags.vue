<template>
  <section class="wrapper">
    <div class="tags-box">
      <div class="tag">
        <h2 v-text="key"></h2>
      </div>
    </div>
    <main class="illust-wrapper">
      <ul class="illust-box">
        <li class="illust" v-for="(item, index) in picturesByTags" :key="index">
          <picture-box :item="item" />
        </li>
      </ul>
    </main>
    <footer class="pagination">
      <el-pagination style="justifyContent: center;" background layout="prev, pager, next" hide-on-single-page
      :current-page="currentPage" :total="total" :page-size="pageSize" @current-change="onCurrentPageChange" />
    </footer>
  </section>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import pictureBox from './components/pictureBox.vue';
import { Yixiv } from '@/views/engine';
import { IPublicPictureParams } from '@/views/types/Yixiv';
import { yixivStore } from '@/stores';

const { setNavigationBarActiveIndex } = yixivStore();
setNavigationBarActiveIndex(-1);

const route = useRoute();
const { key } = route.params;
const tag = Array.isArray(key) ? key[0] : key;


const pageSize = 30;
const currentPage = ref<number>(1);
const total = ref<number>(0);

const picturesByTags = ref<any[]>([]);
const getPictureByTags = async () => {
  const params: IPublicPictureParams = {
    tags: tag,
    offset: currentPage.value,
    limit: pageSize,
  }
  const { count, rows } = await Yixiv.getPublicPicture(params);
  total.value = count;
  picturesByTags.value = rows;
};

const onCurrentPageChange = (value: number) => {
  currentPage.value = value;
  getPictureByTags();
};


const init = () => {
  getPictureByTags();
}
init();

</script>
<style lang="less" scoped>
@import './style/global.less';

.wrapper {
  margin-top: 48px;

  .tags-box {
    margin: 0 auto 20px;
    width: @contentWidth;
    position: relative;
    display: flex;
    align-items: flex-start;

    .tag {
      display: flex;
      margin-bottom: 8px;

      h2 {
        margin: 0;
        color: #000000e0;
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .illust-wrapper {
    box-sizing: border-box;
    margin: 0 auto;
    width: @contentWidth;

    .illust-box {
      background-color: @backgroundColor1;
      display: flex;
      flex-wrap: wrap;
      margin: -12px;
    }
  }

  .pagination {
    padding: 60px 0 20px;
    text-align: center;
  }
}
</style>
