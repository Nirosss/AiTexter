<script setup lang="ts">
  import { ref, onMounted, getCurrentInstance } from 'vue'
  import Header from '../src/components/Header.vue'
  import InputOutput from './components/InputOutput.vue'
  import AboutModal from './components/AboutModal.vue'
  import { getStrings } from './services/history.service' 

  import { ElMessage } from 'element-plus'

  const showAboutModal = ref(false)
  const showLoginModal = ref(false)
  const isDark = JSON.parse(localStorage.getItem('isDark') ?? "false")
  const isDarkClass = ref(isDark)
  const currentOpenModal = ref('')
  const isLoggedIn = ref(false)
  const drawer = ref(false)

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
    localStorage.setItem('isDark', JSON.stringify(isDarkClass.value))
  }

  function copyToClipboard(specVal: string = '') {
    var input = document.createElement('input')
    input.setAttribute('value', specVal)
    document.body.appendChild(input)
    input.select()
    var result = document.execCommand('copy')
    document.body.removeChild(input)
    ElMessage({
        message: 'The Text has been copied',
        type: 'success',
      })
    return result
  }

</script>

<template>
  <div class="main-layout height-filler" :class="{ dark: isDarkClass }">
    <Header
      @toggleDark="toggleDarkClass()"
      @toggleAbout="toggleModal('about')"
      @toggleLogin="toggleModal('login')"
      @toggleDrawer="drawer = !drawer"
      :isLoggedIn="isLoggedIn"
      class="main-layout" />
    <InputOutput />
    <AboutModal
      v-if="showAboutModal"
      @toggleAbout="toggleModal('about')"
      v-click-outside="toggleModal"
      class="about-modal" />
    <el-drawer v-model="drawer"  :with-header="false" :style="{ backgroundColor: isDark ? '#27272f' : '#86459f'}">
        <p style="curser: pointer;" v-for="str in getStrings()" class="history-string" @click="copyToClipboard(str)">
          {{ str }}
        </p>
    </el-drawer>
  </div>
</template>

<!-- v-click-outside="toggleModal('login')" -->
<!-- v-click-outside="toggleModal('about')" -->

