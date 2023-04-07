

<script setup lang="ts">

import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCurrentSession } from '../Services/appwrite.service'
import { ArrowDown } from '@element-plus/icons-vue'

onMounted(() => {
    enrichedUser()
})

const power = ref(0)

const enrichedUser = async () => {
    try {
        const user = await getCurrentSession();
        if (user) {
            options = [
                ...options,
                {
                    value: 'Teacher',
                    label: 'Like a Teacher ✨',
                },
                {
                    value: '60',
                    label: 'Like the 60\'s ✨',
                },
                {
                    value: 'Interviewer',
                    label: 'Like a Interviewer ✨',
                },
                {
                    value: 'Persuasive',
                    label: 'Persuasive ✨',
                },
                {
                    value: 'Corporate',
                    label: 'Like corporation leader ✨',
                },
                {
                    value: 'Viral',
                    label: 'Like a viral post ✨',
                },
                {
                    value: 'ChatGPT',
                    label: 'Just speak with ChatGPT ✨',
                },
            ]
        }
    }
    catch (err) {
        throw err;
    }
}



const count = ref(0)
const userInput = ref('')
const outputString = ref(null)
const formatType = ref('')
const output = reactive({
    value: '',
})
const outputList = reactive({
    value: ["string"],
})

const isRequestSended = reactive({
    value: false,
})

async function sendFormattingRequest() {
    if (!(userInput.value && formatType.value)) return
    output.value = ''
    isRequestSended.value = true

    //@ts-ignore
    const BASE_URL = (process.env.NODE_ENV !== 'development')
        ? '/translate'
        : 'http://127.0.0.1:8080/translate';


    try {
        const res = await axios.post(BASE_URL, {
            text: userInput.value,
            to: formatType.value,
        })
        isRequestSended.value = false
        setTypewriter(res.data.translation[0])
        outputList.value = res.data.translation
    } catch (err) {
        console.log(err);
        ElMessage({
            message: 'OpenAI Servers are down and we are down with them',
            type: 'error',
        })
    }
}

function copyToClipboard(specVal: string = "") {
    if (!output.value) return
    var valToCopy = (specVal) ? specVal : output.value

    var input = document.createElement('input')
    input.setAttribute('value', valToCopy)
    document.body.appendChild(input)
    input.select()
    var result = document.execCommand('copy')
    document.body.removeChild(input)
    openMsg();
    return result
}

function getTitle() {
    if (!userInput.value) return "You didn't type any text"
    else if (!formatType.value) return "You didn't select formatting type"
    return "Click to convert"
}

function setTypewriter(text: string, startIdx: number = 0) {
    output.value = text.substring(0, startIdx)
    const timeout = Math.random() * 50
    const interval = setInterval(() => {
        output.value += text.charAt(startIdx)
        startIdx++

        if (startIdx < text.length) {
            clearInterval(interval)
            setTypewriter(text, startIdx)
        } else {
            clearInterval(interval)
        }
    }, timeout)
}


const openMsg = () => {
    ElMessage({
        message: 'AI Text has been copied',
        type: 'success',
    })
}

var options = [
    {
        value: 'grammar',
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
        value: 'Costumers',
        label: 'Engage with customers as a CEO',
    },
    {
        value: 'Documentation',
        label: 'As an official documentation of an API or web service',
    },
]
</script>

<template>
    <main>
        <h2 class="input-output-header anim-typewriter">
            Let's makes your text <span class="word"></span>!
        </h2>

        <section class="input-output-grid" style="position: relative;">
            <section class="user-input">

                <textarea placeholder="Place your text here" v-model="userInput"></textarea>
                <div class="user-input-actions" :title="getTitle()">

                    <el-select v-model="formatType" class="m-2" placeholder="Select" size="large">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>

                    <button :class="{ isActive: userInput && formatType }" @click="sendFormattingRequest">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-magic" viewBox="0 0 16 16">
                            <path
                                d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0v1.829Zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707L14 2.707ZM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707L7.293 4Zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1h1.829Zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1h1.829ZM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707L13.293 10ZM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0v1.829Zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0L8.354 9.06Z" />
                        </svg>
                        ReWrite
                    </button>
                </div>
            </section>

            <section class="ai-output">
                <div class="string-wrapper">
                    <svg v-if="isRequestSended.value && !output.value" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        style="margin: auto; display: block; shape-rendering: auto; animation-play-state: running; animation-delay: 0s;"
                        width="200px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <rect x="17" y="38.5" width="16" height="23" fill="#a855c8"
                            style="animation-play-state: running; animation-delay: 0s;">
                            <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline"
                                keyTimes="0;0.5;1" values="31.599999999999998;38.5;38.5"
                                keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"
                                style="animation-play-state: running; animation-delay: 0s;"></animate>
                            <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline"
                                keyTimes="0;0.5;1" values="36.800000000000004;23;23" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                                begin="-0.2s" style="animation-play-state: running; animation-delay: 0s;"></animate>
                        </rect>
                        <rect x="42" y="38.5" width="16" height="23" fill="#8b0abe"
                            style="animation-play-state: running; animation-delay: 0s;">
                            <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline"
                                keyTimes="0;0.5;1" values="33.325;38.5;38.5" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                                begin="-0.1s" style="animation-play-state: running; animation-delay: 0s;"></animate>
                            <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline"
                                keyTimes="0;0.5;1" values="33.35;23;23" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"
                                style="animation-play-state: running; animation-delay: 0s;"></animate>
                        </rect>
                        <rect x="67" y="38.5" width="16" height="23" fill="#a855c8"
                            style="animation-play-state: running; animation-delay: 0s;">
                            <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline"
                                keyTimes="0;0.5;1" values="33.325;38.5;38.5" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                                style="animation-play-state: running; animation-delay: 0s;"></animate>
                            <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline"
                                keyTimes="0;0.5;1" values="33.35;23;23" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                                style="animation-play-state: running; animation-delay: 0s;"></animate>
                        </rect>
                        <!-- [ldio] generated by https://loading.io/ -->
                    </svg>
                    <p v-if="output.value" ref="output-string">
                        {{ output.value }}
                    </p>
                </div>

                <div class="ai-output-actions">
                    <el-dropdown trigger="click" :disabled="outputList.value.length <= 1">
                        <el-button type="primary" :class="{ isActive: output.value && outputList.value.length > 1 }">
                            Variation's List<el-icon class="el-icon--right isActive" ><arrow-down /></el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="() => copyToClipboard(variation)" v-for="variation in outputList.value">{{variation}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <button :class="{ isActive: output.value }" @click="() => copyToClipboard()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-clipboard" viewBox="0 0 16 16">
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

        <section class="about-tool">
            <h2>AITexter is a free tool powered by free services thats make your english <span>clear and precise</span>.
            </h2>
            <p>Would you like to contribute? For more information, please <a class="contact-us-action"
                    href="https://www.linkedin.com/in/avishai-dotan">contact us.</a></p>
            <p>Have you found a 🐛? Add an issue <a class="contact-us-action"
                    href="https://github.com/AvishaiDotan/AiTexter-frontend">here.</a></p>
            <h2>AITexter is a free tool powered by free services thats make your english <span>clear and precise</span>.</h2>
            <p>Would you like to contribute? For more information, please <a class="contact-us-action" href="https://www.linkedin.com/in/avishai-dotan">contact us.</a></p>
        </section>
    </main>
</template>

<style>
.el-button.el-button--primary.el-tooltip__trigger {
    height: 100%;
}

.ai-output-actions {
    gap: 10px;
}
</style>

