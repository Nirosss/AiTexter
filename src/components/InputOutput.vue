<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
    <main class="input-output-grid">
        <section class="user-input">
            <textarea placeholder="Place your text here"></textarea>
            <div class="user-input-actions">
                <button>send</button>
            </div>
        </section>

        <section class="ai-output">
            output
        </section>
    </main>
</template>

<style scoped lang="scss">
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

    > * {
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
            }
        }
    }

    .ai-output {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-inline-start: none;
    }
}
</style>

