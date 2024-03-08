import { computed, ref } from 'vue'
import { defineStore } from 'pinia';

interface TokenType {
  token: string
  refresh_token?: string
}

export const tokenStore = defineStore('ACCESS_TOKEN', () => {
  const TOKEN = ref<string>('');

  const ACCESS_TOKEN = computed<TokenType>(() => {
    try {
      return JSON.parse(TOKEN.value
        || localStorage.getItem("TOKEN")  || "{}")
    } catch (error) {
      localStorage.setItem("TOKEN", "");
      throw error;
    }
  })

  const setAccessToken = (token: TokenType) => {
    const JsonToken = JSON.stringify(token);
    TOKEN.value = JsonToken;
    localStorage.setItem("TOKEN", JsonToken);
  };

  return {
    ACCESS_TOKEN,
    setAccessToken,
  };
})
