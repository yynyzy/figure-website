<template>
  <div class="wrapper">
    <div class="illust-content" v-loading="loading">
      <div class="illust">
        <ul class="pages">
          <li v-for="(item, index) in illusts" :key="index">
            <div class="image-wrapper">
              <el-image
                class="image"
                lazy
                fit="cover"
                :src="item.regular_url"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="1"
                :initial-index="0"
                :preview-src-list="previewList"
              />
            </div>
          </li>
        </ul>
      </div>
      <div class="info">
        <div class="info-rang">
          <h2 class="title">{{ pictureInfo.title }}</h2>
          <div v-if="pictureInfo.desc" class="illust-desc" v-html="pictureInfo.desc"></div>
          <span class="translate-btn">{{ i18n.translate }}</span>
          <div class="tags">
            <ul v-if="pictureInfo.tags.length">
              <li v-for="(item, index) in pictureInfo.tags" :key="index">
                <router-link class="link" :to="`/yixiv/search/tags/${item}`">
                  <a class="tag">#{{ item }}</a>
                </router-link>
              </li>
            </ul>
          </div>
          <ul class="count">
            <li>
              <i class="far fa-heart" />
              <span class="num">{{ pictureInfo.collect_total }}</span>
            </li>
            <li>
              <i class="far fa-star" />
              <span class="num">{{ pictureInfo.like_total }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <aside class="illust-aside">
      <section class="user-box">
        <router-link :to="`/yixiv/author/${authorInfo.user_id}`">
            <span class="avatar">
              <img :src="authorInfo.avatar" />
            </span>
          </router-link>
        <div class="info">
          <h2 class="ellipsis">
            <router-link :to="`/yixiv/author/${authorInfo.user_id}`">
              {{ authorInfo.nick_name }}
            </router-link>
          </h2>
          <p class="desc ellipsis" v-text="authorInfo.user_id"></p>
        </div>
      </section>
      <section class="others">
        <header class="header">
          <h5>{{  i18n.otherWorks }}</h5>
          <router-link class="more" :to="`/yixiv/author/${authorInfo.user_id}`">
            {{ i18n.moreWorks }}
          </router-link>
        </header>
        <div class="content">
          <ul class="other-list">
            <li v-for="(item, index) in userBestPictureArr" :key="index">
              <router-link class="link" :key="item.picture_id" :to="`/yixiv/illust/${item.picture_id}`">
                <img :src="`${item.regular_url}?x-oss-process=image/resize,m_fill,w_450`">
              </router-link>
            </li>
          </ul>
        </div>
      </section>
    </aside>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, watch } from 'vue';
import { Yixiv } from '@/views/engine';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { IUserBestPictureParams } from '@/views/types/Yixiv';
import { yixivStore } from '@/stores';

const { setNavigationBarActiveIndex } = yixivStore();
setNavigationBarActiveIndex(-1);
const i18n = {
  otherWorks: '其他作品',
  moreWorks: '更多作品',
  translate: '翻译',
};

const route = useRoute();
const loading = ref<boolean>(false);

const illusts = ref<any[]>([]);
const previewList = ref<string[]>([]);

// 图片
interface PictureInfo {
  title: string
  collect_total: number
  like_total: number
  desc: string
  tags: string[]
};
const pictureInfo = reactive<PictureInfo>({
  title: '',
  collect_total: 0,
  like_total: 0,
  desc: '',
  tags: []
});

// 作者
interface AuthorInfo {
  avatar: string
  nick_name: string
  user_id: string
};
const authorInfo = reactive<AuthorInfo>({
  avatar: '',
  nick_name: '',
  user_id: '',
});

const init = async () => {
  loading.value = true;
  const picture_id = getRouteParams();
  const data = await Yixiv.getUserPictureInfo(picture_id);
  const {
    pages,
    author,
    title,
    collect_total,
    like_total,
    desc,
    tags,
  } = data;
  illusts.value = pages.map((item: any) => {
    item.regular_url = item.regular_url.replace("http://", "https://") + "?x-oss-process=image/resize,m_fill,w_1000";
    return item;
  });
  previewList.value = illusts.value.map((item: any) => item.regular_url);

  pictureInfo.title = title;
  pictureInfo.collect_total = collect_total;
  pictureInfo.like_total = like_total;
  pictureInfo.desc = desc;
  pictureInfo.tags = tags.split(',');

  authorInfo.avatar = author.avatar;
  authorInfo.nick_name = author.nick_name;
  authorInfo.user_id = author.user_id;

  userBestPictureArr.value = await getUserBestPicture({
    picture_id: '112773104',
    user_id: author.user_id
  });
  loading.value = false;
}

const getRouteParams = () => {
  const { pictureId } = route.params;
  return Array.isArray(pictureId) ? pictureId[0] : pictureId;
}
const userBestPictureArr = ref<any[]>([]);
const getUserBestPicture = async(params: IUserBestPictureParams ) => {
  try {
    const { rows: userBestPicture } = await Yixiv.getUserBestPicture(params)
    return userBestPicture;
  } catch (error) {
    return [];
  }
};
init();

const stopWatchRoute = watch(route, ()=>{
  init();
});
onBeforeRouteLeave(() => {
   stopWatchRoute()
})
</script>

<style lang="less" scoped>
@import './style/global.less';

.wrapper {
  display: flex;
  margin: 24px auto 0;
  width: @contentWidth;
  padding-bottom: 56px;

  .illust-content {
    flex: 1;
    border-radius: 8px 8px 0 0;
    min-height: 480px;

    .illust {
      margin: 0;
      padding: 0 16px 16px;
      border-radius: 8px;
      background: #fff;
      font-size: 14px;
      line-height: calc(1em + 8px);

      .pages {
        li {
          padding-top: 40px;

          &:first-child {
            padding-top: 0;
          }

          .image-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 200px;
            min-height: 480px;
          }
        }
      }

    }

    .info {
      display: flex;
      justify-content: center;
      margin: 32px auto;
      padding: 0 16px;
      background: #fff;

      .info-rang {
        width: 600px;
        margin: 32px auto;

        .title {
          margin: 0 0 8px;
          color: #1f1f1f;
          font-size: 20px;
          line-height: 24px;
          font-weight: 700;
        }

        .illust-desc {
          word-break: break-word;
          margin: 0;
          color: #5c5c5c;
          line-height: 1.33;
        }

        .translate-btn {
          cursor: pointer;
          display: block;
          font-size: 13px;
          color: @color1;
          margin: 10px 0;
        }

        .tags {
          ul {
            word-break: break-all;

            li {
              display: inline;
              margin: 0 15px 2px 0;

              .tag {
                font-size: 14px;
                color: #3d7699;
                margin: 0 0 2px 4px;
                padding: 0;
                white-space: nowrap;
              }
            }
          }
        }

        .count {
          display: flex;
          align-items: center;
          margin: 21px -4px;
          list-style: none;
          padding: 0;

          li {
            flex: 0 0 auto;
            margin: 0 8px;
            font-size: 13px;
            color: #838383;

            i {
              margin: 0 2px;
            }

            .num {
              margin: 0 2px;
              line-height: 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }

    }
  }

  .illust-aside {
    width: 288px;
    flex: 0 0 auto;
    margin-left: 24px;

    .user-box {
      display: flex;

      .avatar {
        display: inline-block;
        height: 60px;
        width: 60px;
        line-height: 60px;
        border-radius: 50%;
        overflow: hidden;

        img {
          display: block;
          height: 100%;
        }
      }

      .info {
          padding-left: 10px;

          h2 {
            font-size: 18px;
            line-height: 40px;
            overflow: hidden;
            width: 140px;
            color: #333;
          }

          .desc {
            width: 140px;
            margin: 0;
            color: #5c5c5c;
            font-size: 14px;
            line-height: 1.33;
            word-break: break-word;
          }
        }
    }

    .others {
      margin-top: 30px;

      .header {
        display: flex;

        h5 {
        color: #666;
        }

        .more {
          margin-left: auto;
          font-size: 12px;
          color: #999;
          line-height: 15px;
        }
      }

      .content {
        .other-list {
          display: flex;
          padding: 0;
          flex-wrap: wrap;
          margin: 12px 0;

          li {
            margin-right: 6px;
            margin-bottom: 3px;
            margin-top: 3px;

            .link {
              width: 90px;
              height: 90px;
              display: block;
              cursor: pointer;

              img {
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 0;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                border-radius: 8px;
              }
            }
          }
        }
      }
    }
  }
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-word;
}
</style>
