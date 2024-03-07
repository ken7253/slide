<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps<{
  title: string;
  level?: 2 | 3 | 4 | 5 | 6;
}>();

const heading = `h${props.level ?? 2}`;
</script>

<template>
  <div class="container">
    <component :is="heading" class="heading">{{ props.title }}</component>
    <p class="content"><slot></slot></p>
  </div>
</template>

<style scoped>
#app {
  .container {
    position: relative;
    background-color: var(--c-main);
    border-radius: 10px;
  }
  .heading {
    display: flex;
    margin: 0;
    padding: 0 8px;
    width: 100%;
    font-size: 1rem;
    color: var(--c-main);
    font-weight: 900;
    background-color: var(--c-base);
    border-radius: 8px 8px 0 0;
  }
  .heading::before {
    all: revert;
    content: "🤔";
    padding: 0 4px;
  }
  .content {
    margin: 0;
    padding: 8px 16px;
  }
}
</style>
