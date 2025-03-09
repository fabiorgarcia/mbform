<script setup>

  import { ref, computed } from 'vue';
  
</script>

<template>

<div class="loading-state">
  <div class="loading"></div>
</div>

  
</template>

<style scoped>

  .loading {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 10px solid var(--light-orange);
    border-top-color: #ffffff;
    animation: loading 1s linear infinite;
    margin-top: -60px;
  }
  @keyframes loading {
    to {
      transform: rotate(360deg);
    }
  }

</style>