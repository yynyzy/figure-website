<template>
  <section class="wrapper">
    <header class="header">
      <div class="content">
        <div class="profile">
          <img :src="authorInfo.avatar" />
        </div>
        <div class="info">
          <div class="name" v-text="authorInfo.nick_name"></div>
          <div class="desc">
            <p v-text="authorInfo.desc"></p>
          </div>
        </div>
      </div>
      <a class="pid" target="_blank" :href="`https://www.pixiv.net/users/${authorInfo.user_id}`" >
        {{ i18n.PID }} {{ authorInfo.user_id }}
      </a>
    </header>
    <main class="inner-box">
      <div class="wrapper">
        <h2 class="title" v-text="i18n.illustTitle"></h2>
        <ul v-if="userPictureArr.length" class="illust-content">
          <li class="illust" v-for="(item, index) in userPictureArr" :key="index">
            <picture-box :item="item" />
          </li>
        </ul>
        <div v-else class="not-found">
          <no-works />
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
      </div>
    </main>
  </section>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Yixiv } from '@/views/engine';
import pictureBox from './components/pictureBox.vue';
import noWorks from './components/noWorks.vue';
import { IPublicPictureParams } from '@/views/types/Yixiv';
import { yixivStore } from '@/stores';

const { setNavigationBarActiveIndex } = yixivStore();
setNavigationBarActiveIndex(-1);

const i18n = {
  PID: 'P站：',
  illustTitle: '#作品列表',
}
const route = useRoute();
const { userId } = route.params;
const user_Id = Array.isArray(userId) ? userId[0] : userId;

interface AuthorInfo {
  avatar: string
  nick_name: string
  user_id: string
  desc: string
};
const authorInfo = reactive<AuthorInfo>({
  avatar: '',
  nick_name: '',
  user_id: '',
  desc: '',
});

const getAuthorInfo = async() => {
  try {
    const { rows } = await Yixiv.searchUser(user_Id);
    const author = rows[0];
    authorInfo.avatar = author.avatar;
    authorInfo.desc = author.desc;
    authorInfo.nick_name = author.nick_name;
    authorInfo.user_id = author.user_id;
  } catch (error) {
    /** */
  }
};

const pageSize = 24;
const currentPage = ref<number>(1);
const total = ref<number>(0);
const userPictureArr = ref<any[]>([]);

const getPictureByUserId = async() => {
  const params: IPublicPictureParams = {
    author_user_id: user_Id,
    offset: currentPage.value - 1,
    limit: pageSize,
    sort: 'new',
    type: 0,
  }
  try {
    const { count, rows } = await Yixiv.getPublicPicture(params);
    userPictureArr.value = rows;
    total.value = count;
  } catch (error) {
    /** */
  }
};

const onCurrentPageChange = (value: number) => {
  currentPage.value = value;
  getPictureByUserId();
};

const init = async() => {
  getAuthorInfo();
  getPictureByUserId();
}
init();

</script>

<style lang="less" scoped>
@import './style/global.less';

.wrapper {
  position: relative;
}
.header {
  width: 100%;
  margin-top: 55px;

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: @contentWidth;
    position: relative;

    .profile {
      display: flex;
      align-items: center;
      width: 100px;
      height: 100px;
      margin-right: 24px;

      img {
        display: block;
        width: 85px;
        height: 85px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .info {
      flex: 1;

      .name {
        padding-top: 24px;
        font-size: 20px;
        font-weight: 700;
        line-height: 28px;
        color: rgba(0,0,0,.88);
      }

      .desc {
        display: flex;
        align-items: center;
        margin-top: 2px;
        color: rgba(0,0,0,.32);
        font-size: 16px;

        p {
          max-width: 850px;
        }
      }
    }
  }

  .pid {
    width: 100%;
    margin: 0 auto;
    width: @contentWidth;
    position: relative;
    font-size: 13px;
    color: #999;
    display: block;
  }
}

.inner-box {
  padding: 0 0 48px;
  min-height: 100vh;
  margin-top: 45px;

  .wrapper {
    margin: 0 auto;
    width: @contentWidth;

    .title {
      font-size: 20px;
      line-height: 28px;
      color: #000000a3;
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
        margin: 12px;
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
}
</style>
