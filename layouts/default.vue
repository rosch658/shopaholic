<template>
  <div class="default-page">
    <Essay v-if="essayIsOpen" />
    <Navigation />
    <slot />
  </div>
</template>

<script setup>
const { essayIsOpen } = useEssay();
</script>

<style scoped>
.default-page {
  position: relative;
}
</style>
