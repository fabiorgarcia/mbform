<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="main-content">
    <form class="mbc-form">

      <div class="steps">
        <p>Etapa <span class=""><strong>01</strong> de 05</span></p>
      </div>
      <h2>Seja Bem-vindo(a)</h2>

    </form>
  </div>
</template>

