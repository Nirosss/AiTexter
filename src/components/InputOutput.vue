<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'


async function sendFormattingRequest() {
    if (!(userInput.value && formatType.value)) return

    output.value = ""
    const res = await getDemoData();//axios.post('http://127.0.0.1:8080/translate', {text: userInput.value, from:'English' ,to:formatType.value})
    console.log(res.data.translation)
    output.value = res.data.translation
}

async function getDemoData() {
    return new Promise<any>((resolve, reject) => {
        let text = `In general it is always smart to use your existing config.json when updating the menu exe.)`
        setTimeout(() => { resolve({ data: { translation: text } }) }, 2000)
    })
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
const outputString = ref(null);
const formatType = ref('')

const output = reactive({
    value: "",
})

const options = [
    {
        value: 'Correct',
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
        value: "Persuasive",
        label: "Persuasive"
    },
    {
        value: 'Senior',
        label: 'As Senior Dev',
    },
    {
        value: 'HR',
        label: 'As HR specialist',
    },
    {
        value: 'Corporation',
        label: 'Like Corporation leader',
    },
]
</script>

<template>
    <main>
        <h2 class="input-output-header anim-typewriter">Let's makes your text <span class="word"></span>!</h2>
        <section class="input-output-grid">

            <section class="user-input">
                <textarea placeholder="Place your text here" v-model="userInput"></textarea>

                <div class="user-input-actions">
                    <el-select v-model="formatType" class="m-2" placeholder="Select" size="large">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <button :class="{ 'isActive': userInput && formatType }" @click="sendFormattingRequest">
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
                    <p ref="output-string" :class="{ 'typing-demo': output.value }">{{ output.value }}</p>
                </div>

                <div class="ai-output-actions">
                    <button :class="{ 'isActive': output.value }" @click="copyToClipboard">
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
    </main>
</template>

<style scoped lang="scss">
.el-select.el-select--large.m-2 {
    max-width: 111px;
    height: 44px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
}

::-webkit-scrollbar {
    width: 10px;
    background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb {
    background-color: #a855c8;
    background-image: -webkit-linear-gradient(45deg,
            rgba(255, 255, 255, .2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, .2) 50%,
            rgba(255, 255, 255, .2) 75%,
            transparent 75%,
            transparent)
}

.typing-demo {
  width: 22ch;
  animation: typing 2s steps(22), blink .5s step-end infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
}

@keyframes typing {
  from {
    width: 0
  }
}
    
@keyframes blink {
  50% {
    border-color: transparent
  }
}




h1 {
    font-size: 25px;
}

.header-wrapper {
    text-align: center;

    .input-output-header {
        font-size: 20px;
        font-weight: 700;
        color: #1c1c1c;
        text-align: center;

        span {
            font-weight: 900;
        }
    }
}


.input-output-grid {

    display: grid;
    justify-content: center;
    grid-template-columns: 100%;
    grid-template-rows: 250px 250px;

    .user-input button, .ai-output button{
        padding-inline: 20px;
            padding-block: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            border: 0;
            background-color: #8b0abe54;
            border-radius: 5px;
            color: white;
            font-weight: 600;
            transition: 0.4s;
            box-shadow: 0 0 0px #a855c8;
            cursor: not-allowed;

            &.isActive {
                background-color: #a855c8;
                cursor: pointer;

                &:hover {
                    background-color: #b069cc;
                    box-shadow: 0 0 3px #a855c8;
                }
            }
    }

    .user-input {
        display: flex;
        flex-direction: column;


        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        // border-top-left-radius: 10px;
        // border-bottom-left-radius: 10px;

        .user-input-actions {
            display: flex;
            justify-content: space-between;

            .el-input__wrapper {
                max-width: 113px;
            }
        }

        textarea {
            flex-basis: 80%;
            max-height: 160px;
            margin-block: 10px;

            resize: none;
            outline: none;
            border: none;
            color: #1c1c1c;

            font-family: Roboto;
            font-size: 16px;

            &::placeholder {
                color: #1c1c1c;
                font-family: Roboto;
                font-size: 16px;
            }
        }
    }

    >* {
        background-color: white;
        border: 0.01px #e5d9e4 solid;
        padding: 24px 10px 10px 24px;
        overflow-y: auto;
    }

    .ai-output {
        display: flex;
        flex-direction: column;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-block-start: none;
        padding: 24px 24px 10px 24px;

        .string-wrapper {
            flex-basis: 80%;
            max-height: 160px;
            margin-block: 10px;
            overflow-y: auto;

            p {
                margin: 0;
            }
        }

        .ai-output-actions {
            display: flex;
            justify-content: flex-end;

            .el-input__wrapper {
                max-width: 113px;
            }
        }
    }

    @media screen and (width >=400px) {
        grid-template-columns: 400px;
    }

    @media screen and (width >=750px) {
        grid-template-columns: 1fr 300px 300px 1fr;
        grid-template-rows: 250px;

        .user-input {
            grid-column: 2;
            border-top-right-radius: 00px;
            border-bottom-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        .ai-output {
            grid-column: 3;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 0px;

            border-inline-start: none;
            border-block-start: 0.01px #e5d9e4 solid;
        }
    }

    @media screen and (width >=950px) {
        grid-template-columns: 1fr 400px 400px 1fr;
    }

    @media screen and (width >=1200px) {
        grid-template-columns: 1fr 500px 500px 1fr;
    }

    @media screen and (width >=1920px) {
        grid-template-columns: 10% 1fr 1fr 10%;
    }

}

/* The typing animation */
@import '../assets/styles/basics/typed';

h1 {
    text-align: center;
}

.word {
    padding: 0 0 0 3px;
    background-color: #a855c8;
    color: white;

    &::before {
        font-weight: 600;
    }

    @include typed("AI", "Correct", "Senior", "HR", "Corporative", "Formal", "Casual",
        "Threatening", "Persuasive", "Informative", "Formal",
        "Informal", "Emotional", "Sarcastic", "Inspirational",
        "Motivational", "Romantic", "Academic", "Creative",
        "Technical",
        2,
        (caret-width: 2px, caret-space: 2px, iterations: 1));
}
</style>

