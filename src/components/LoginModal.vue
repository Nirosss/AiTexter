<script setup lang="ts">
  import { ref } from 'vue'
  // import { login , signup } from '../Services/appwrite.service.js'
  const email = ref('')
  const password = ref('')
  const emit = defineEmits(['toggleLogin', 'toggleSession'])
  const props = defineProps({
    isLoggedInUser: Boolean,
  })
  const buttonText = ref('Submit')
  const systemMessage = ref('')
  const isSignup = ref(false)
  const toggleSignup = () => {
    isSignup.value = true
    buttonText.value = 'Signup'
    return isSignup.value
  }
  async function signIn() {
    try {
      if (!isSignup.value) {
        await login(email.value, password.value)
        emit('toggleSession', true)
        emit('toggleLogin')
      } else {
        await signup(email.value, password.value)
        emit('toggleSession', true)
        emit('toggleLogin')
      }
    } catch (err) {
      let msg = err + ''
      systemMessage.value = msg.substring(msg.indexOf(':') + 2)
      password.value = ''
    }
  }
  async function logOut() {
    try {
      await logout()
      emit('toggleSession', false)
    } catch (err) {
      console.log(err)
    } finally {
      emit('toggleLogin')
    }
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
    <div class="logout-modal flex" v-if="props.isLoggedInUser">
      <p>Are you sure you want to log out?</p>
    <div>
    </div>
      <div class="buttons-container">
      <button @click="logOut">Yes</button>
      <button @click="$emit('toggleLogin')">No</button>
      </div>
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
            class="login-form message">
            Password must be at least 8 characters
          </p>
          <p class="login-form message" v-if="password.length <= 0">
            {{ systemMessage }}
          </p>
          <p @click="toggleSignup" class="login-form signup">
            Not a user yet? Click to SignUp
          </p>
          <button :disabled="!email || password.length < 8" type="submit">
            {{ buttonText }}
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
