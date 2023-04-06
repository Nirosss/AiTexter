<script setup lang="ts">
  import { ref, reactive, computed  } from 'vue'

  let isDark: boolean = false
  const buttonText = ref('Dark Mode')
  function toggleDark() {
    isDark = !isDark
    buttonText.value = isDark ? 'Light Mode' : 'Dark Mode'
  }
  const props = defineProps({
    isLoggedInUser : Boolean
  }
  )
    const loginButtonText = computed(() => {
    return props.isLoggedInUser  ? 'Log out' : 'Log in'
  })
</script>
<template>
  <header class="header-main full">
    <div class="flex space-between">
      <h1>AITexter<span style="font-size: 10px">Beta</span></h1>
      <div class="nav-btn container flex">
        <button @click=" $emit('toggleLogin')" class="header-btn">
          {{ loginButtonText }}
        </button>
        <button @click="toggleDark(), $emit('toggleDark')" class="header-btn">
          {{ buttonText }}
        </button>
        <button @click="$emit('toggleAbout')" class="header-btn">About</button>
      </div>
    </div>
  </header>
</template>
