<script setup lang="ts">
import { ref, reactive } from 'vue'
import { login, signup, getCurrentSession, logout } from '../Services/appwrite.service'
import type { FormInstance, FormRules } from 'element-plus'
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

var isUserAlreadySignup = ref(true);

const ruleForm = reactive({
  email: "",
  password: "",
})

function toggleLoginSignupState() {
  isUserAlreadySignup.value = !isUserAlreadySignup.value
}

const rules = reactive<FormRules>({
  email: [
    { required: true, message: 'Please input your email address', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change'],
    }

  ],
  password: [
    {
      required: true,
      message: 'Please enter tour password',
      trigger: 'blur',
    },
    { min: 8, max: 10, message: 'Length should be 8 to 10 letters', trigger: 'blur' },
  ],
})

const emit = defineEmits(['toggleLogin'])
const props = defineProps({
  isLoggedInUser: Boolean,
})

async function signIn() {
  try {
    !isUserAlreadySignup ? await login(ruleForm.email, ruleForm.password) : await signup(ruleForm.email, ruleForm.password)
  } catch (ex: any) {
    console.log(ex)
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
