<script setup lang="ts">
import { ref, reactive  } from 'vue'

defineProps<{ msg: string }>()


const count = ref(0)
const userInput = ref('')
</script>

<template>
    <main>
        <h1 class="input-output-header anim-typewriter">Let's makes your text <span class="time-of-day"></span>!</h1>
        <section class="input-output-grid">

            <section class="user-input">
                <textarea 
                    placeholder="Place your text here"
                    v-model="userInput"
                >
                    
                </textarea>
                <div class="user-input-actions">
                    <button :class="{ 'isActive': userInput }">
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
                output
            </section>
        </section>
    </main>
</template>

<style scoped lang="scss">
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
    grid-template-columns: 400px;
    grid-template-rows: 250px 250px;

    @media screen and (width >=750px) {
        grid-template-columns: 1fr 300px 300px 1fr;
        grid-template-rows: 250px;

        .user-input {
            grid-column: 2;
        }

        .ai-output {
            grid-column: 3;
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

    >* {
        background-color: white;
        border: 0.01px #e5d9e4 solid;
        padding: 24px 10px 10px 24px;
    }

    .user-input {
        display: flex;
        flex-direction: column;

        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;

        textarea {
            flex-basis: 80%;

            resize: none;
            outline: none;
            border: none;
            color: #1c1c1c;

            &::placeholder {
                color: #1c1c1c;
                font-family: Roboto;
                font-size: 16px;
            }
        }

        button {
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
    }

    .ai-output {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-inline-start: none;
    }

    /* The typing animation */
}

@import '../assets/styles/basics/typed';

h1 {
    text-align: center;
}

.time-of-day {
    padding: 0 0 0 3px;
    background-color: #a855c8;
    color: white;

    &::before {
        font-weight: 600;
    }

    @include typed("AI", "Funny", "Professional", "Lazy", "Cool", "Young",
        "Threatening", "Persuasive", "Informative", "Formal",
        "Informal", "Emotional", "Sarcastic", "Inspirational",
        "Motivational", "Romantic", "Academic", "Creative",
        "Technical",
        2,
        (caret-width: 2px, caret-space: 2px, iterations: 1));
}
</style>

