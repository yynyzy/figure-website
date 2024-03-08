<template>
  <section class="wrapper">
    <div class="actions">
      <div class="modes-content">
        <router-link :class="['mode-btn', { active: modeActiveIndex === 0 }]"
          :to="{ name: '', query: { date: ranking_date, mode: 'daily' } }">
          {{ i18n.daily }}
        </router-link>
        <router-link :class="['mode-btn', { active: modeActiveIndex === 1 }]"
          :to="{ name: '', query: { date: ranking_date, mode: 'weekly' } }">
          {{ i18n.weekly }}
        </router-link>
        <router-link :class="['mode-btn', { active: modeActiveIndex === 2 }]"
          :to="{ name: '', query: { date: ranking_date, mode: 'monthly' } }">
          {{ i18n.monthly }}
        </router-link>
      </div>
      <div class="filters">
        <div v-if="Number(ranking_date) < Number(Today)" class="date-btn" style="margin-right: 15px;">
          <router-link :to="{ name: '', query: { date: next_ranking_date, mode: initMode } }">
            {{ i18n.nextDay }}
          </router-link>
        </div>
        <div v-if="Number(ranking_date) < Number(Today)" class="date-btn" style="margin-right: 15px;">
          <router-link :to="{ name: '', query: { date: Today, mode: initMode } }">
            {{ i18n.new }}
          </router-link>
        </div>
        <div class="current-date">{{ currentDateFormat }}</div>
        <div class="date-btn" style="margin-right: 15px;">
          <router-link :to="{ name: '', query: { date: last_ranking_date, mode: initMode } }">
            {{ i18n.lastDay }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="illust-box" v-loading="loading">
      <h2 class="title" v-text="i18n.title"></h2>
      <ul v-if="rankingPictures.length" class="illust-content">
        <li class="illust" v-for="(item, index) in rankingPictures" :key="index">
          <picture-box :item="item" :picture-height="258" :picture-width="225" />
        </li>
      </ul>
      <div v-else class="not-found">
        <no-works />
      </div>
    </div>
    <div class="pagination">
      <el-pagination style="justifyContent: center;" background layout="prev, pager, next" :current-page="currentPage"
        :total="total" :page-size="pageSize" @current-change="onCurrentPageChange" />
    </div>
  </section>
</template>

<script setup lang='ts'>
import moment from 'moment';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Yixiv } from '@/views/engine';
import { IGetRankingListsParams } from '@/views/types/Yixiv';
import { yixivStore } from "@/stores";
import pictureBox from './components/pictureBox.vue';
import noWorks from './components/noWorks.vue';

const route = useRoute();

const i18n = {
  title: '#排行榜',
  lastDay: '上一日',
  nextDay: '下一日',
  daily: '今日',
  weekly: '本周',
  monthly: '本月',
  new: '最新',
};
const loading = ref<boolean>(false);
const { setNavigationBarActiveIndex } = yixivStore();
setNavigationBarActiveIndex(2);

/**
 * daily 0
 * weekly 1
 * monthly 2
 */
const initMode = ref<string>('daily');
const modeActiveIndex = ref<number>(0);
const setModeActiveIndex = (mode: string) => {
  initMode.value = mode;
  if (mode === 'daily') {
    modeActiveIndex.value = 0;
  } else if (mode === 'weekly') {
    modeActiveIndex.value = 1;
  } else {
    modeActiveIndex.value = 2;
  }
};

const Today = moment().format('YYYYMMDD');
const currentDateFormat = ref<string>('');
const ranking_date = ref<string>('');
const last_ranking_date = ref<string>('');
const next_ranking_date = ref<string>('');

const changeTimeSetting = (date?: string) => {
  if (date) {
    ranking_date.value = moment(date).format('YYYYMMDD');
    last_ranking_date.value = moment(date).subtract(1, 'days').format('YYYYMMDD');
    next_ranking_date.value = moment(date).add(1, 'days').format('YYYYMMDD');
  } else {
    ranking_date.value = moment().format('YYYYMMDD');
    last_ranking_date.value = moment().subtract(1, 'days').format('YYYYMMDD');
    next_ranking_date.value = moment().add(1, 'days').format('YYYYMMDD');
  }
  switch (initMode.value) {
    case 'daily':
      currentDateFormat.value = date ? moment(date).format('YYYY年MM月DD日') : moment().format('YYYY年MM月DD日');
      break;
    case 'weekly':
      currentDateFormat.value = date
        ? `${moment(date).subtract(1, 'weeks').format('YYYY年MM月DD日')} - ${ moment(date).format('YYYY年MM月DD日') }`
        : `${moment().subtract(1, 'weeks').format('YYYY年MM月DD日')} - ${ moment().format('YYYY年MM月DD日') }`;
      break;
    case 'monthly':
    currentDateFormat.value = date
        ? `${moment(date).subtract(1, 'months').format('YYYY年MM月DD日')} - ${ moment(date).format('YYYY年MM月DD日') }`
        : `${moment().subtract(1, 'months').format('YYYY年MM月DD日')} - ${ moment().format('YYYY年MM月DD日') }`;
      break;
    default:
      currentDateFormat.value = date ? moment(date).format('YYYY年MM月DD日') : moment().format('YYYY年MM月DD日');
      break;
  }
};

const timeType = ref<number>(0);
const setRankingListsParamsTimeType = (mode: string) => {
  let temp = 0
  if (mode === 'weekly') {
    temp = 1;
  }
  if (mode === 'monthly') {
    temp = 2;
  }
  timeType.value = temp;
};
const rankingPictures = ref<any[]>([]);
const getRankingList = async () => {
  const rankingListsParams: IGetRankingListsParams = {
    type: timeType.value,
    ranking_date: ranking_date.value,
    offset: currentPage.value,
    limit: 30,
  };

  loading.value = true;
  try {
    const { count, rows } = await Yixiv.getRankingList(rankingListsParams);
    rankingPictures.value = rows.map((item: any) => {
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
  getRankingList();
};

watch(() => route.query, () => {
  const { date, mode } = route.query;
  if (mode) {
    setModeActiveIndex(mode as string);
    setRankingListsParamsTimeType(mode as string);
  };
  if (date) {
    changeTimeSetting(date as string);
  } else {
    changeTimeSetting();
  }
  getRankingList();
}, { immediate: true, deep: true });
</script>
<style lang="less" scoped>
@import './style/global.less';

.wrapper {
  margin: 0 auto;
  width: @contentWidth;

  .actions {
    display: flex;
    margin: 45px 0;

    .modes-content {
      display: flex;

      .mode-btn {
        background: #f9f9f9;
        color: #258fb8;
        width: 120px;
        height: 40px;
        border: 0;
        line-height: 40px;
        text-align: center;
        border-radius: 4px;
        margin-right: 15px;
      }

      .active {
        background: @color1 !important;
        color: #fff;
      }
    }

    .filters {
      display: flex;
      width: 100%;
      flex-flow: row-reverse;

      .current-date {
        color: #333;
        line-height: 40px;
        font-weight: 700;
        font-size: 18px;
      }

      .date-btn {
        color: #258fb8;
        line-height: 40px;
        text-decoration: none;
        font-size: 14px;
        margin-left: 15px;
      }
    }
  }

  .illust-box {
    margin-top: 45px;
    min-height: 200px;

    .title {
      font-size: 20px;
      line-height: 28px;
      color: rgba(0, 0, 0, .64);
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

  .not-found {
    text-align: center;
    min-height: 360px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  .pagination {
    padding: 60px 0 20px;
  }
}
</style>
