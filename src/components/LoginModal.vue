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
}
function logOut() {
  logout()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      signIn();
      emit('toggleLogin')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div>
    <button @click="$emit('toggleLogin')" class="close-about-modal">
      <svg class="close-about-modal svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        role="presentation" focusable="false" style="
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
      <p style="text-align: center;">Are you sure you want to logout?</p>
      <div style="display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;">
        <button class="aitexter-btn" @click="() => {logOut(); $emit('toggleLogin')}">Yes</button>
        <button class="aitexter-btn" @click="$emit('toggleLogin')">No</button>
      </div>
    </div>
    <div v-if="!props.isLoggedInUser">
      <div class="login-intro">
        <h2>AITexter is <span style="color: #a745ce">Much Much</span> better for Users!</h2>
        <p style="text-align: center">
          <span>{{ !isUserAlreadySignup ? "Login" : "Signup" }}</span> to discover our <span
            style="font-weight: 1000; text-decoration: underline;">Extra</span> free features.
        </p>
      </div>
      <div class="login-form-container">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
          :size="formSize" status-icon>
          <el-form-item label="Email Address" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="ruleForm.password" />
          </el-form-item>
          <el-form-item>
            <el-button class="signup-button" style="background-color: #a855c8;" type="primary"
              @click="() => { submitForm(ruleFormRef)}">
              {{ !isUserAlreadySignup ? "Log Me In!" : "Sign Me Up!" }}
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>

        <h5 @click="() => toggleLoginSignupState()" v-if="!isUserAlreadySignup.valueOf()" style="text-align: center;">Not
          a user yet ? click <span style="cursor:pointer;color: #a855c8">HERE</span> to signup</h5>
        <h5 @click="() => toggleLoginSignupState()" v-else style="text-align: center;">Needs to login ? click <span
            style="color: #a855c8; cursor:pointer;">HERE</span></h5>
      </div>
    </div>
  </div>
</template>

<style>
.el-form-item {
  flex-direction: column;
}</style>
