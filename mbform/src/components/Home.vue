<script setup>

  import { ref, computed } from 'vue';

  defineProps({
    msg: String,
  })

  const currentStep = ref(1)
  const titleStep = ref('Seja Bem-vindo(a)')
  const email = ref(null)
  const naturalLegalPerson = ref(null)
  const emailError = ref(false)
  const naturallegalPersonError = ref(false)

  const validateForm = computed(()=>{
    !validateEmail(email.value) ? emailError.value = true : emailError.value = false
    !naturalLegalPerson.value ? naturallegalPersonError.value = true : naturallegalPersonError.value = false
    if (!emailError.value && !naturallegalPersonError.value) {
      currentStep.value = ref(2) 
      naturalLegalPerson.value == 'natural' ?  titleStep.value = ref('Pessoa Física') : titleStep.value = ref('Pessoa Jurídica')
    } 
  })

  function validateEmail(x) {
    var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(x); 
  }

  

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="main-content">
    <form class="mbc-form">
      <div class="steps">
        <p>Etapa <span class=""><strong>{{ currentStep }}</strong> de 05</span></p>
      </div>
      <h2>{{ titleStep }}</h2>

      <section id="step1" v-show="currentStep == '1'">
        <div id="email" class="form-input">
          <label>Endereço de e-mail</label>
          <input inputmode="text" v-bind:class = "(emailError)?'input-error':'input-wrapper'" type="email" v-model="email">
          <small class="error" v-show="emailError">Por favor digite um e-mail válido.</small>
        </div>
        <div id="email" class="form-input radio-list">
          <label for="natural_person"><input type="radio" id="natural_person" name="naturalLegalPerson" value="natural" v-model="naturalLegalPerson" /> Pessoa física</label>
          <label for="legal_person"><input type="radio" id="legal_person" name="naturalLegalPerson" value="legal" v-model="naturalLegalPerson" /> Pessoa jurídica</label>
        </div>
        <small class="error" v-show="naturallegalPersonError">Por favor escolha uma opção.</small>
        <div  class="form-input form-buttons">
          <!--<button class="back-button">Continuar</button>-->
          <button type="button" @click="validateForm">Continuar</button>
        </div>
      </section>


    </form>
  </div>
</template>

