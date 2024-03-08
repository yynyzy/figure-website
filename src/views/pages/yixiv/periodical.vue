<template>
  <div class="periodical-wrapper">
    <div v-for="(item, index) in periodicalList" class="periodical-item" :key="index">
      <div class="card">
        <div class="thumbnail">
          <div class="img-wrapper">
            <router-link  :to="`/yixiv/periodical/${item.album_id}`">
              <el-image class="img" :src="item.cover" fit="cover" lazy />
            </router-link>
        </div>
        </div>
        <div class="title-wrapper">
          <router-link  :to="`/yixiv/periodical/${item.album_id}`">
            <h2 class="link-title" v-text="item.title"></h2>
          </router-link>
        </div>
        <div class="footer">
          <div class="tags">
            <a v-for="(ITag, index) in item._tags" class="tag" :key="index" href="" v-text="`#${ITag}`"></a>
          </div>
          <time class="date" v-text="item.create_date"></time>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { yixivStore } from '@/stores';
import { Yixiv } from '@/views/engine';
import { IGetPeriodicalList } from '@/views/types/Yixiv';
import { ref } from 'vue';

const { setNavigationBarActiveIndex } = yixivStore();
setNavigationBarActiveIndex(3);

const periodicalList = ref<any[]>([]);
const getPeriodicalList = async () => {
  const params: IGetPeriodicalList = {
    offset: 0,
    limit: 15,
  };
  const { rows } = await Yixiv.getPeriodicalList(params);
  rows.forEach((item: any) => {
    item._tags = formatTags(item.tags);
  });
  periodicalList.value = rows;
};

const formatTags = (tags: string) => {
  return tags.split(',');
};

getPeriodicalList();
</script>
<style lang="less" scoped>
.periodical-wrapper {
  padding: 7px;

  .periodical-item {
    float: left;
    box-sizing: border-box;
    width: 33.3%;
    padding-left: 7.5px;
    padding-right: 7.5px;

    .card {
      min-height: 340px;
      background: #fff;
      margin-bottom: 15px;
      box-shadow: 1px 2px 2px 2px #eaeaea;
      border-radius: 5px;
      overflow: hidden;
      border-width: 0;

      .thumbnail {
        height: 238px;
        overflow: hidden;

        .img-wrapper {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: top;

          .img {
            object-fit: cover;
            object-position: top center;
            width: 100%;
            height: 100%;
          }
        }
      }

      .title-wrapper {
        .link-title {
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0;
          line-height: 26px;
          margin: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .footer {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        flex-wrap: nowrap;
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 26px;

        .tag {
          color: #ff007a;
          display: inline;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0;
        }

        .date {
          font-size: 13px;
          color: #aaa;
        }
      }
    }
  }
}
</style>
