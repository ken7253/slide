<template>
  <div>
    <div class="icon" style="{{}}">
      <prof-icon />
    </div>
    <ul class="like">
      <li>TypeScript</li>
    </ul>
  </div>
</template>

<script lang="ts">
import ProfIcon from './ProfIcon.vue';
export default {
  components: { ProfIcon },
  props: {
    colorTheme: {
      type: String,
      default: '#049dbf'
    },
  }
}
</script>

<style scoped>
.icon {
  border-radius: 50%;
  overflow: hidden;
  width: fit-content;
  max-width: 200px;
}
</style>