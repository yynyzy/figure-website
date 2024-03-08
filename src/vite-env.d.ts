
/// <reference types="vite/client" />

// 声明 module，防止使用引入的第三方库报 warning
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'lodash';
