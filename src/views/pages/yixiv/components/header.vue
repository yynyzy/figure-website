<template>
  <nav class="nav">
    <div class="left-header">
      <div class="logo" v-text="i18n.logo"></div>
      <el-menu
        mode="horizontal"
        background-color="transparent"
        :default-active="String(props.activeNavigation)"
        :ellipsis="false"
        @select="onClickHeader"
        >
        <el-menu-item
          v-for="(item, index) in navigation"
          :key="index"
          :index="item.path"
          >
          {{ item.label }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right-header">
      <el-input
        class="search"
        v-model="searchValue"
        :placeholder="i18n.searchIllustration"
        :prefix-icon="Search"
        @keyup.enter.native="onSearch"
      />
      <div class="tag">
        <el-dropdown
          class="dropdown"
          trigger="click"
          @command="onChangeType"
        >
          <span class="type">
            {{ currentSelectTypeLabel }}
            <arrow-down class="arrow"/>
          </span>
          <template #dropdown>
            <el-dropdown-menu class="dropdown-menu">
              <el-dropdown-item
                v-for="(item, index) in TYPE"
                class="tag"
                :command="item.value"
                :key="String(index)"
              >
              {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <a class="back" ></a>
  </nav>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { yixivStore } from "@/stores";
import { ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { INavigation } from '../config/router';

const router = useRouter();
const store = yixivStore();
const { setNavigationBarActiveIndex, setSearchType } = store;

const i18n = {
  logo: 'yixiv',
  searchIllustration: '搜索插画'
};

interface Props {
  activeNavigation: string
  navigation: INavigation[]
};
const props = defineProps<Props>();

interface Emits {
  (event: 'changeMenu', value: string): void;
  (event: 'search', value: {keyword: string, type: string}): void;
};
const emits = defineEmits<Emits>();


const onClickHeader = (path: string) => {
  emits('changeMenu', path);
};

// 搜索标签功能
const TYPE = [
  {
    label: '按标签',
    value: '0',
  },
  {
    label: '按画师',
    value: '1',
  }
];
const currentSelectTypeLabel =  computed(() => TYPE[store.inputSearchTypes].label);
const onChangeType = (value: number) => setSearchType(value);

// 搜索内容
const searchValue = ref<string>('');
const onSearch = () => {
  if(searchValue.value === '') return;
  setNavigationBarActiveIndex(-1);
  if (store.inputSearchTypes === 0) {
    router.push(`/yixiv/search/tags/${searchValue.value}`);
  } else {
    router.push(`/yixiv/search/author/${searchValue.value}`);
  }
};

</script>
<style lang="less" scoped>
.nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 64px;

  .left-header {
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
      min-width: 80px;
      text-align: center;
      color: #00ffff;
      font: 28px bold;
    }

    .el-menu-item.is-active {
      background-color: transparent !important;
    }

    .el-menu-item:hover {
      background-color: transparent !important;
    }
  }

  .right-header {
    width: 700px;
    display: flex;
    align-items: center;
    justify-content: center;


    .search {
      height: 40px;
      background: #0000000a;

      :deep(.el-input__wrapper) {
        background-color: #0000000a;
      }

      :deep(.el-input__inner) {
        &::placeholder {
          color: rgba(0, 0, 0, .64);
        }
      }
    }

    .tag {
      margin-left: 10px;
      padding: 0 15px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      white-space: nowrap;

      &:hover {
        border: 1px solid #409eff;
      }

      .dropdown {
        color: #606266;
        font-size: 14px;
        font-weight: 700;
        height: 40px;
        line-height: 40px;
        cursor: pointer;

        .type {
          display: flex;
          justify-content: center;
          align-items: center;

          .arrow {
            height: 100%;
            width: 15px;
            margin-left: 5px;
          }
        }
      }
    }
  }

  .back {
    font: 20px bold sans-serif;
    border-bottom: 1px solid #000;
  }

}

// el 的下拉组件下拉部分默认是挂载在 body 上的
.dropdown-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;

  .tag {
    height: 40px;
    line-height: 40px;
    padding: 0 15px;

    &:hover {
      background-color: #f5f7fa;
      color: #409eff;
    }
  }
}
</style>
