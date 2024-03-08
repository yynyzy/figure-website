<template>
  <section class="wrapper">
    <main>
      <authorList :author-list="searchAuthor"/>
    </main>
    <footer class="pagination">
      <el-pagination
        style="justifyContent: center;"
        background
        layout="prev, pager, next"
        hide-on-single-page
        :current-page="currentPage"
        :total="total"
        :page-size="pageSize"
        @current-change="onCurrentPageChange"
    />
    </footer>
  </section>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Yixiv } from '@/views/engine';
import { ISearchAuthorList } from '@/views/types/Yixiv';
import authorList from './components/authorList.vue';
import { yixivStore } from '@/stores';

const { setNavigationBarActiveIndex } = yixivStore();
setNavigationBarActiveIndex(-1);

const route = useRoute();
const { key: key_ } = route.params;
const key = Array.isArray(key_) ? key_[0] : key_;


const pageSize = 30;
const currentPage = ref<number>(1);
const total = ref<number>(0);

const searchAuthor = ref<any[]>([]);
const searchAuthorList = async() => {
  const params: ISearchAuthorList = {
    keyword: key,
    offset: currentPage.value,
    limit: pageSize,
  }
  const { count, rows } = await Yixiv.searchAuthorList(params);
  total.value = count;
  searchAuthor.value = rows;
};

const onCurrentPageChange = (value: number) => {
  currentPage.value = value;
  searchAuthorList();
};

const init = () => {
  searchAuthorList();
}
init()

</script>
<style lang="less" scoped>

.wrapper {
  margin-top: 48px;

  .pagination {
    padding: 60px 0 20px;
    text-align: center;
  }
}
</style>
