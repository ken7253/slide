<script setup lang="ts">
const props = defineProps({
  text: String,
});
</script>

<template>
  <div>{{ props.text }}</div>
</template>

<style lang="css" scoped></style>
