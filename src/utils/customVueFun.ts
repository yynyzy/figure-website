import { computed, customRef } from "vue";

const debounceRef = (value: any, delay: number) => {
  let timer: NodeJS.Timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(val) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          // 派发更新
          trigger();
          value = val;  // 页面上的数据会延迟显示
        }, delay);
      }
    }
  })
};

const useModel = (props: any, propName: string, emit: any) => {
  return computed({
    get() {
      return new Proxy(props[propName], {
        set(obj, name, val) {
          emit('update:'+propName, {
            ...obj,
            [name]: val,
          });
          return true;
        }
      })
    },
    set(val) {
      emit('update:' + propName, val);
    }
  })
};

export {
  debounceRef,
  useModel,
};
