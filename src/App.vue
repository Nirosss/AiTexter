<script setup lang="ts">
  import { ref, onMounted, getCurrentInstance } from 'vue'
  import Header from '../src/components/Header.vue'
  import InputOutput from './components/InputOutput.vue'
  import AboutModal from './components/AboutModal.vue'
  import LoginModal from './components/LoginModal.vue'

  import {
    login,
    signup,
    getCurrentSession,
    logout,
  } from './Services/appwrite.service'

  const showAboutModal = ref(false)
  const showLoginModal = ref(false)
  const isDark = localStorage.getItem('isDark')
  const isDarkClass = ref(isDark === 'false')
  const currentOpenModal = ref('')
  const isLoggedIn = ref(false)

  async function toggleModal(modal: string) {
    if (!modal) modal = currentOpenModal.value
    if (modal === 'about') {
      showAboutModal.value = !showAboutModal.value
      currentOpenModal.value = 'about'
    } else {
      showLoginModal.value = !showLoginModal.value
      currentOpenModal.value = 'login'
    }
  }
  function toggleDarkClass() {
    isDarkClass.value = !isDarkClass.value
    localStorage.setItem('isDark', isDarkClass.value + '')
  }
  onMounted(async () => {
    let currentSession = await getCurrentSession()
    isLoggedIn.value = currentSession ? currentSession.current : false
  })

  async function toggleSession() {
    console.log('yay')
    try {
      let currentSession = await getCurrentSession()
      isLoggedIn.value = currentSession ? currentSession.current : false
    } catch (err: any) {
      isLoggedIn.value = false
    }
  }
</script>

<template>
  <div class="main-layout height-filler" :class="{ dark: isDarkClass }">
    <Header
      @toggleDark="toggleDarkClass()"
      @toggleAbout="toggleModal('about')"
      @toggleLogin="toggleModal('login')"
      :isLoggedIn="isLoggedIn"
      class="main-layout" />
    <InputOutput />
    <AboutModal
      v-if="showAboutModal"
      @toggleAbout="toggleModal('about')"
      v-click-outside="toggleModal"
      class="about-modal" />
    <LoginModal
      v-if="showLoginModal"
      @toggleSession="toggleSession()"
      @toggleLogin="toggleModal('login')"
      v-click-outside="toggleModal"
      :isLoggedInUser="isLoggedIn.valueOf()"
      class="about-modal" />
  </div>
</template>

<!-- v-click-outside="toggleModal('login')" -->
<!-- v-click-outside="toggleModal('about')" -->
