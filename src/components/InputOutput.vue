<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import axios from 'axios'

  async function sendFormattingRequest() {
    if (!(userInput.value && formatType.value)) return

    output.value = ''
    const res = await axios.post('http://127.0.0.1:8080/translate', {
      text: userInput.value,
      to: formatType.value,
    })
    console.log(res.data.translation)
    output.value = res.data.translation
  }

  function copyToClipboard() {
    var input = document.createElement('input')
    input.setAttribute('value', output.value)
    document.body.appendChild(input)
    input.select()
    var result = document.execCommand('copy')
    document.body.removeChild(input)
    return result
  }

  const count = ref(0)
  const userInput = ref('')
  const outputString = ref(null)
  const formatType = ref('')
  const output = reactive({
    value: '',
  })

  const options = [
    {
      value: 'grammar correct',
      label: 'Correct Grammar Only',
    },
    {
      value: 'Formal',
      label: 'Formal',
    },
    {
      value: 'Casual',
      label: 'Casual',
    },
    {
      value: 'Persuasive',
      label: 'Persuasive',
    },
    {
      value: 'Senior Dev style',
      label: 'As Senior Dev',
    },
    {
      value: 'HR specialist style',
      label: 'As HR specialist',
    },
    {
      value: 'Corporate',
      label: 'Like Corporation leader',
    },
  ]

  /* 
This should be removed

getDemoData()

async function getDemoData() {
    return new Promise<any>((resolve, reject) => {
      let text = `In general it is always smart to use your existing config.json when updating the menu exe.)`
      setTimeout(() => {
        resolve({ data: { translation: text } })
      }, 2000)
    })
  }
*/
</script>

<template>
  <main>
    <h2 class="input-output-header anim-typewriter">
      Let's makes your text <span class="word"></span>!
    </h2>
    <section class="input-output-grid">
      <section class="user-input">
        <textarea
          placeholder="Place your text here"
          v-model="userInput"></textarea>

        <div class="user-input-actions">
          <el-select
            v-model="formatType"
            class="m-2"
            placeholder="Select"
            size="large">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
          <button
            :class="{ isActive: userInput && formatType }"
            @click="sendFormattingRequest">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-magic"
              viewBox="0 0 16 16">
              <path
                d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0v1.829Zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707L14 2.707ZM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707L7.293 4Zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1h1.829Zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1h1.829ZM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707L13.293 10ZM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0v1.829Zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0L8.354 9.06Z" />
            </svg>
            ReWrite
          </button>
        </div>
      </section>

      <section class="ai-output">
        <div class="string-wrapper">
          <p ref="output-string" :class="{ 'typing-demo': output.value }">
            {{ output.value }}
          </p>
        </div>

        <div class="ai-output-actions">
          <button :class="{ isActive: output.value }" @click="copyToClipboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-clipboard"
              viewBox="0 0 16 16">
              <path
                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
              <path
                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
            </svg>
            Copy
          </button>
        </div>
      </section>
    </section>
  </main>
</template>

