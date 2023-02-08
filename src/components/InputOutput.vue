<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
    <main class="input-output-grid">
        <section class="user-input">
            <textarea rows="2" placeholder="Write or paste your text here" maxlength="280">
            </textarea>
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
            background-color: green;
        }

        .ai-output {
            grid-column: 3;
            background-color: aqua;
        }
    }

    @media screen and (width >=950px) {
        grid-template-columns: 1fr 400px 400px 1fr;
    }

    .user-input {
        padding: 24px 10px 10px 24px;

        background-color: transparent;
        border: 0.01px #e5d9e4 solid;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;

        textarea {
            resize: none;
            outline: none;
            border: none;
        }
    }
    .ai-output {
        background-color: transparent;
        border: 0.01px #e5d9e4 solid;;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-inline-start: none;
    }
}
</style>

