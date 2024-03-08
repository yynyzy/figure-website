<template>
  <div>
    <recommend-tags :tags="tags"/>
    <div class="container">
      <!-- 推荐作品 -->
      <section class="recommend-container wrapper">
        <h2 v-text="i18n.recommendTitle"></h2>
        <ul class="illust-box">
          <li v-for="(item, index) in recommendPictures" :key="index">
            <picture-box :item="item" />
          </li>
        </ul>
      </section>

      <!-- 排行榜 -->
      <section class="ranking-container wrapper">
        <h3 class="sub-title" v-text="i18n.rankingByDayTitle"></h3>
        <h2 class="today" v-text="today"></h2>
        <ul class="illust-box">
          <li v-for="(item, index) in rankingByDayPictures" :key="index">
            <picture-box :item="item" />
          </li>
        </ul>
      </section>

      <!-- 原创的插画作品 -->
      <section class="original-container wrapper">
        <h2 v-text="i18n.originalTitle"></h2>
        <ul class="illust-box">
          <li v-for="(item, index) in originalPicture" :key="index">
            <picture-box :item="item" />
          </li>
        </ul>
      </section>


      <!-- 最新的插画作品 -->
      <section class="new-picture-container wrapper">
        <h2 v-text="i18n.originalTitle"></h2>
        <ul class="illust-box">
          <li v-for="(item, index) in newPictures" :key="index">
            <picture-box :item="item" />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import recommendTags from './components/recommendTags.vue';
import pictureBox from './components/pictureBox.vue';
import Yixiv from '@/views/engine/Yixiv';
import { yixivStore } from "@/stores";
import moment from 'moment';
import { IPublicPictureParams } from '@/views/types/Yixiv';

const { setNavigationBarActiveIndex } = yixivStore();
const i18n = {
  recommendTitle: '推荐作品',
  rankingByDayTitle: '每日排行榜',
  originalTitle: '原创插画作品',
};

const today = `${moment().format('MM月DD日')}的排行榜`;

const tags = ref([]);
const getRecommendTags  = async () => {
  const { rows } = await Yixiv.getTags();
  tags.value = rows.slice(0, 20);
};

const recommendPictures = ref([]);
const getRecommendPicture  = async () => {
  const { rows } = await Yixiv.getRecommendPicture({ limit: 18, offset: 90 });
  recommendPictures.value = rows;
};

const rankingByDayPictures = ref([]);
const getRankingByDayPictures  = async () => {
  const { rows } = await Yixiv.getRankingList({
  limit: 16,
  offset: 0,
  type: 0,
  ranking_date: moment().format('YYYYMMDD'),
  });
  rankingByDayPictures.value = rows;
};

const originalPicture = ref([]);
const getOriginalPicture  = async () => {
  const params: IPublicPictureParams = {
    sort: 'hot',
    type: 0,
    limit: 18,
    offset: 0,
  }
  const { rows } = await Yixiv.getPublicPicture(params);
  originalPicture.value = rows;
};

const newPictures = ref([]);
const getNewPicture  = async () => {
  const params: IPublicPictureParams = {
    sort: 'new',
    type: 0,
    limit: 18,
    offset: 0,
  }
  const { rows } = await Yixiv.getPublicPicture(params);
  newPictures.value = rows;
};

const init = () => {
  setNavigationBarActiveIndex(0);
  getRecommendTags();
  getRecommendPicture();
  getRankingByDayPictures();
  getOriginalPicture();
  getNewPicture();
};

init();
</script>
<style lang="less" scoped>
@import './style/global.less';

.container {
  margin: 0 auto;

  .wrapper {
    padding-bottom: 64px;
    margin: 0 auto;
    width: @contentWidth;

    h2 {
      font-size: 20px;
      line-height: 28px;
      color: #000000a3;
      font-weight: 700;
      margin: 0 0 12px;
    }
  }

  .recommend-container {
    .illust-box {
      background-color: @backgroundColor1;
      display: flex;
      flex-wrap: wrap;
      margin: -12px;
    }
  }

  .ranking-container {
    .sub-title {
      font-size: 14px;
      line-height: 22px;
      font-weight: 400;
      color: #00000052;
    }

    .today {
      font-size: 20px;
      line-height: 28px;
      color: #000000a3;
      font-weight: 700;
      margin: 0;
    }

    .illust-box {
      background-color: @backgroundColor1;
      display: flex;
      overflow-x: scroll;
      margin: -12px;
    }
  }

  .original-container {
    .illust-box {
      background-color: @backgroundColor1;
      display: flex;
      flex-wrap: wrap;
      margin: -12px;
    }
  }

  .new-picture-container {
    .illust-box {
      background-color: @backgroundColor1;
      display: flex;
      flex-wrap: wrap;
      margin: -12px;
    }
  }
}

</style>
