<script setup>
import { defineProps } from "vue";

const props = defineProps(['message'])
</script>

<template>
    <div class="b-overlay position-absolute" style="inset: 0px; z-index: 10;">
       <div class="position-absolute rounded-sm" style="inset: 0px; opacity: 0.71; backdrop-filter: blur(1px);">
       </div>
       <div class="position-absolute" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);text-align: center;">
            <div class="spinner-border spinner-border-lg text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
            </div>
            <br><br>
            {{props.message}}
       </div>
    </div>
</template>
