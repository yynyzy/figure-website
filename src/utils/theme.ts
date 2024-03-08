import { ref, watchEffect } from 'vue';

type Theme = 'light' |'dark';
const THEME_STORAGE_KEY = 'theme';
const theme = ref<Theme>(localStorage.getItem(THEME_STORAGE_KEY) as Theme ||  'light');

watchEffect(() => {
  document.documentElement.dataset.theme =theme.value;
  localStorage.setItem(THEME_STORAGE_KEY, theme.value);
})

const useTheme = () => {
  return {
    theme,
  }
}

export {
  useTheme
};
