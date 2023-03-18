<script setup lang="ts">
  import { ref } from 'vue'
  const email = ref('')
  const password = ref('')
  const emit = defineEmits(['toggleLogin'])
  const props = defineProps({
    isLoggedInUser: Boolean,
  })

  function signIn() {
    signup(email.value, password.value)
    emit('toggleLogin')
  }
  function logOut(){
    logout()
  }
</script>

<template>
  <div>
    <button @click="$emit('toggleLogin')" class="close-about-modal">
      <svg
        class="close-about-modal svg"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style="
          display: block;
          fill: none;
          height: 16px;
          width: 16px;
          stroke: currentcolor;
          stroke-width: 3;
          overflow: visible;
        ">
        <path d="m6 6 20 20"></path>
        <path d="m26 6-20 20"></path>
      </svg>
    </button>
    <div v-if="props.isLoggedInUser">
      <p>Are you sure you want to log out?</p>
      <button @click="logOut">Yes</button>
      <button @click="$emit('toggleLogin')">No</button>
    </div>
    <div v-if="!props.isLoggedInUser">
      <div class="login-intro">
        <h2>AITexter is a completely free tool!</h2>
        <p style="text-align: center">
          Sign up or Login to unlock some extra free features.
        </p>
      </div>
      <div class="login-form-container">
        <form @submit.prevent="signIn" class="login-form flex column">
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Please insert your email"
            required />
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Please type your password"
            required />
          <p
            v-if="email !== '' && password.length > 0 && password.length < 8"
            class="login-form-password">
            Password must be at least 8 characters
          </p>
          <button v-bind:disabled="!email || password.length < 8" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
    <div class="about-us">
      <div class="about-us txt-container">
        <h5>Created by Nir Roiter & Avishai Dotan</h5>
      </div>
    </div>
  </div>
</template>
