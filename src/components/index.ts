import { App, Component } from 'vue';

import {
  ElButton,
  ElMenu,
  ElInput,
  ElTag,
  ElImage,
  ElMenuItem,
  ElPagination,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElCarousel,
  ElCarouselItem,
  ElDialog,
  ElRadioGroup,
  ElRadioButton,
  ElIcon,
} from 'element-plus';

// 按需注册 element-plus 全局组件
const ElComponents: Component[] = [
  ElDialog,
  ElButton,
  ElInput,
  ElMenu,
  ElMenuItem,
  ElTag,
  ElImage,
  ElPagination,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElCarousel,
  ElCarouselItem,
  ElRadioGroup,
  ElRadioButton,
  ElIcon,
];

const ComponentPlugin = {
  install(vm: App) {
    ElComponents.forEach((component) => {
      vm.component(component.name!, component)
    });
  }
};

export default ComponentPlugin;
