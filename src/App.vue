<script setup lang="ts">
  import { ref } from 'vue'
  import Header from '../src/components/Header.vue'
  import InputOutput from './components/InputOutput.vue'
  import AboutModal from './components/AboutModal.vue'
  const showModal = ref(false)

  const isDark = localStorage.getItem("isDark")
  const isDarkClass = ref(isDark === "false")
 

  function toggleAbout() {
    showModal.value = !showModal.value
  }
  
  function toggleDarkClass() {
    isDarkClass.value = !isDarkClass.value
    localStorage.setItem("isDark", isDarkClass.value + '')
  }
</script>

<template>
  <div class="main-layout height-filler" :class="{ dark : isDarkClass }">
    <Header
      @toggleDark="toggleDarkClass()"
      @toggleAbout="toggleAbout"
      class="main-layout" />
    <InputOutput />
    <AboutModal
      v-if="showModal"
      @toggleAbout="toggleAbout"
      v-click-outside="toggleAbout"
      class="about-modal" />
  </div>
</template>

<!--  -->
