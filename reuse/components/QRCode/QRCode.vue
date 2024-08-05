<script setup lang="ts">
import { onMounted, ref } from "vue";
import QRCode from "qrcode";
const props = defineProps({
  text: String,
});

const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  if (!(canvas.value instanceof HTMLCanvasElement)) return;
  QRCode.toCanvas(canvas.value, props.text ?? "");
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style lang="css" scoped></style>
