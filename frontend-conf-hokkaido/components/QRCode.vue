<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import QRCode from "qrcode";

export type Props = {
  text: string;
  removeParams?: boolean;
  caption?: string;
};

const props = withDefaults(defineProps<Props>(), {
  text: "",
  removeParams: true,
  caption: "",
});

const canvas = ref<HTMLCanvasElement>();

const removeParams = (text: string) => {
  if (!URL.canParse(text)) {
    return text;
  }
  const noParamsURL = text.split("?")[0];

  return props.removeParams ? noParamsURL : props.text;
};

const link = computed(() =>
  URL.canParse(props.text) ? removeParams(props.text) : undefined
);

onMounted(() => {
  if (!(canvas.value instanceof HTMLCanvasElement)) return;
  QRCode.toCanvas(canvas.value, removeParams(props.text) ?? "");
});
</script>

<template>
  <div class="container">
    <a class="outer" :href="link" target="_blank" rel="noreferrer">
      <canvas class="canvas" ref="canvas"></canvas>
    </a>
    <span class="caption">{{ props.caption }}</span>
  </div>
</template>

<style lang="css" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 16px 0;
}
.outer {
  display: block;
  width: fit-content;
  border: solid 3px;
  border-radius: 8px;
  overflow: hidden;
  color: #333;

  &[href]:hover {
    opacity: 0.8;
  }
}

.caption {
  display: block;
  text-align: center;
  font-size: 1rem;
}

.canvas {
  display: block;
}
</style>
