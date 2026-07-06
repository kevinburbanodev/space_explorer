import { computed, ref } from 'vue'
import { dictionaries, type Lang } from './translations'

const STORAGE_KEY = 'space_explorer_lang'

function readInitialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'es' ? 'es' : 'en'
}

const lang = ref<Lang>(readInitialLang())
document.documentElement.lang = lang.value

export function useLanguage() {
  const t = computed(() => dictionaries[lang.value])

  function setLang(value: Lang) {
    lang.value = value
    localStorage.setItem(STORAGE_KEY, value)
    document.documentElement.lang = value
  }

  function toggleLang() {
    setLang(lang.value === 'en' ? 'es' : 'en')
  }

  return { lang, t, toggleLang }
}
