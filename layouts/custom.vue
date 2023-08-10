<template>
  <div class="custom-page">
    <Essay v-if="essayIsOpen" />
    <Navigation :style="{ position: 'sticky' }" />
    <div class="custom-layout">
      <slot />
    </div>
  </div>
</template>

<script setup>
const { essayIsOpen } = useEssay();
</script>

<style scoped>
.custom-page {
  background-color: #faf2e1;
  min-height: 100vh;
  position: relative;
}

.custom-layout {
  width: 60%;
  margin: 0 auto;
  margin-top: 10rem;
  background-color: #faf2e1;
}
</style>
