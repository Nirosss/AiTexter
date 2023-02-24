<script setup lang="ts">
  import { ref, reactive } from 'vue'
  let isDark: boolean = false
  const buttonText = ref('Dark Mode')
  function toggleDark() {
    isDark = !isDark
    buttonText.value = isDark ? 'Light Mode' : 'Dark Mode'
  }
</script>
<template>
  <header class="header-main full">
    <div class="flex space-between">
      <h1>AITexter</h1>
      <div class="nav-btn container flex">
        <button @click="toggleDark(), $emit('toggleDark')" class="header-btn">
          {{ buttonText }}
        </button>
        <button @click="$emit('toggleAbout')" class="header-btn">About</button>
      </div>
    </div>
  </header>
</template>
