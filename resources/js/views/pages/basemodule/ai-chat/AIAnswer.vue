<template>
    <div>
        <p v-if="displayedAnswer" style="font-size: 14px;color: #1c1c4d;">{{ displayedAnswer }}</p>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    answer: {
        type: String,
        default: "Answer will be displayed here."
    }
});

const displayedAnswer = ref("");
let typingInterval;

watch(() => props.answer, (newAnswer) => {
    if (typingInterval) clearInterval(typingInterval);
    displayedAnswer.value = "";
    if (newAnswer) {
        let index = 0;
        typingInterval = setInterval(() => {
            if (index < newAnswer.length) {
                displayedAnswer.value += newAnswer[index++];
            } else {
                clearInterval(typingInterval);
            }
        }, 30);  // Adjust the speed of typing here (50ms per character)
    }
});
</script>

<style scoped>

</style>
