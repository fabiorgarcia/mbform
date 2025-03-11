<script setup>

  import { ref, computed, onMounted, reactive } from 'vue';
  import Loading from './Loading.vue';
  import Sucess from './Sucess.vue';

  defineProps({
    msg: String,
  })

  let resdata = reactive
  const sucessMsg = ref(false)
  const loadingData = ref(true)
  const currentStep = ref(1)
  const email = ref(null)
  const emailError = ref(false)
  const naturalLegalPerson = ref(null)
  const naturallegalPersonError = ref(false)
  const name = ref(null)
  const nameError = ref(false)
  const cpf = ref(null)
  const cpfError = ref(false)
  const birth = ref(null)
  const birthError = ref(false)
  const telephone = ref(null)
  const telephoneError = ref(false)
  const corporate = ref(null)
  const corporateError = ref(false)
  const cnpj = ref(null)
  const cnpjError = ref(false)
  const opening = ref(null)
  const openingError = ref(false)
  const telephoneCorporate = ref(null)
  const telephoneCorporateError = ref(false)
  const password = ref(null)
  const passwordError = ref(false)


  onMounted (async ()=>{
    setTimeout(closeLoading, 1500)
    await fetch("http://localhost:3000/api/services")
    .then(res => res.json())
    .then(res => {
      resdata =  res
      console.log(resdata)
    })
  })


  function loadingSuces() {
    loadingData.value = false;
    sucessMsg.value = true;
  }
  
  function closeLoading() {
    loadingData.value = false;
  }

  const validateStep1 = computed(()=>{
    !isEmail(email.value) ? emailError.value = true : emailError.value = false
    !naturalLegalPerson.value ? naturallegalPersonError.value = true : naturallegalPersonError.value = false
    if (!emailError.value && !naturallegalPersonError.value)  currentStep.value = 2
  })

  const validateStep2 = computed(()=>{
    if (naturalLegalPerson.value == 'natural') {
      !name.value ? nameError.value = true : nameError.value = false
      !cpf.value ? cpfError.value = true : !isCpf(cpf.value.replace(/[^0-9]/g,'')) ? cpfError.value = true : cpfError.value = false 
      !birth.value ? birthError.value = true : isDate(birth.value) ? birthError.value = true : birthError.value = false 
      !telephone.value ? telephoneError.value = true : telephone.value.length < 13 ? telephoneError.value = true : telephoneError.value = false
      if (!nameError.value && !cpfError.value && !birthError.value && !telephoneError.value) currentStep.value = 3
    } else {
      !corporate.value ? corporateError.value = true : corporateError.value = false
      !cnpj.value ? cnpjError.value = true : !isCnpj(cnpj.value.replace(/[^0-9]/g,'')) ? cnpjError.value = true : cnpjError.value = false 
      !opening.value ? openingError.value = true : isDate(opening.value) ? openingError.value = true : openingError.value = false 
      !telephoneCorporate.value ? telephoneCorporateError.value = true : telephoneCorporate.value.length < 13 ? telephoneCorporateError.value = true : telephoneCorporateError.value = false
      if (!corporateError.value && !cnpjError.value && !openingError.value && !telephoneCorporateError.value) currentStep.value = 3
    }
  })

  const validateStep3 = computed(()=>{
    !password.value ? passwordError.value = true : currentStep.value = 4    
  })

  function isEmail(x) {
    var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(x); 
  }

  function maskCpf(){
    cpf.value=cpf.value.replace(/\D/g,"")
    cpf.value=cpf.value.replace(/(\d{3})(\d)/,"$1.$2")
    cpf.value=cpf.value.replace(/(\d{3})(\d)/,"$1.$2")
    cpf.value=cpf.value.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
  }

  function isCpf(inputCPF) {
      var sum = 0;
      var i;
      var rest;
      if (inputCPF.value == "00000000000") return false;
      for (i = 1; i <= 9; i++)
        sum = sum + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
      rest = (sum * 10) % 11;
      if (rest == 10 || rest == 11) rest = 0;
      if (rest != parseInt(inputCPF.substring(9, 10))) return false;
      sum = 0;
      for (i = 1; i <= 10; i++)
        sum = sum + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
      rest = (sum * 10) % 11;
      if (rest == 10 || rest == 11) rest = 0;
      if (rest != parseInt(inputCPF.substring(10, 11))) return false;
      return true;
  }

  function isDate(str) {
    var date = new Date(str.split('/').reverse().join('/'));
    var novaData = new Date();
    if(date > novaData) return true
    else return false
  }

  function maskTelephone() {
    var r;
    naturalLegalPerson.value == 'natural' ? r = telephone.value.replace(/\D/g, "") : r = telephoneCorporate.value.replace(/\D/g, "")
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    }  else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (naturalLegalPerson.value == 'natural') {
      telephone.value.trim() !== "" ? r = r.replace(/^(\d*)/, "($1") : ''
    }else if (naturalLegalPerson.value == 'person') {
      telephoneCorporate.value.trim() !== "" ? r = r.replace(/^(\d*)/, "($1") : ''
    }
    naturalLegalPerson.value == 'natural' ? telephone.value = r :  telephoneCorporate.value = r
    
  }

  function maskCnpj() {
    cnpj.value= cnpj.value.replace(/\D/g,"")
    cnpj.value= cnpj.value.replace(/^(\d{2})(\d)/,"$1.$2")
    cnpj.value= cnpj.value.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
    cnpj.value= cnpj.value.replace(/\.(\d{3})(\d)/,".$1/$2")
    cnpj.value= cnpj.value.replace(/(\d{4})(\d)/,"$1-$2")
    cnpj.value= cnpj.value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1 $2 $3/$4-$5")
  }

  function isCnpj() {
    var b = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
    var c = String(cnpj.value).replace(/[^\d]/g, '')
    
    if(c.length !== 14) return false

    if(/0{14}/.test(c))  return false

    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n))  return false

    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n)) return false

    return true
  }

  const registerData = computed(()=>{

    !isEmail(email.value) ? emailError.value = true : emailError.value = false;
    !naturalLegalPerson.value ? naturallegalPersonError.value = true : naturallegalPersonError.value = false;
    if (naturalLegalPerson.value == 'natural') {
      !name.value ? nameError.value = true : nameError.value = false
      !cpf.value ? cpfError.value = true : !isCpf(cpf.value.replace(/[^0-9]/g,'')) ? cpfError.value = true : cpfError.value = false 
      !birth.value ? birthError.value = true : isDate(birth.value) ? birthError.value = true : birthError.value = false 
      !telephone.value ? telephoneError.value = true : telephone.value.length < 13 ? telephoneError.value = true : telephoneError.value = false
    } else {
      !corporate.value ? corporateError.value = true : corporateError.value = false
      !cnpj.value ? cnpjError.value = true : !isCnpj(cnpj.value.replace(/[^0-9]/g,'')) ? cnpjError.value = true : cnpjError.value = false 
      !opening.value ? openingError.value = true : isDate(opening.value) ? openingError.value = true : openingError.value = false 
      !telephoneCorporate.value ? telephoneCorporateError.value = true : telephoneCorporate.value.length < 13 ? telephoneCorporateError.value = true : telephoneCorporateError.value = false
    }
    !password.value ? passwordError.value = true : passwordError.value = false;

    if (!emailError.value && !naturallegalPersonError.value && !nameError.value && !cpfError.value && !birthError.value && !telephoneError.value && !corporateError.value && !cnpjError.value && !openingError.value && !telephoneCorporateError.value && !passwordError.value ) {
      loadingData.value = true;
      setTimeout(loadingSuces, 4000)

      fetch('http://localhost:3000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          naturalLegalPerson: naturalLegalPerson.value,
          name: name.value,
          cpf: cpf.value,
          birth: birth.value,
          telephone: telephone.value,
          corporate: corporate.value,
          cnpj: cnpj.value,
          opening: opening.value,
          telephoneCorporate: telephoneCorporate.value,
          password: password.value
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => {
        console.log(error)
        }) 
      
    }
  
  })

  function returnStep(x) {
    currentStep.value = x
    const oldEmail = email.value;
    email.value = '';
    email.value = oldEmail;

    const oldName = name.value;
    name.value = '';
    name.value = oldName;

    const oldCorporate = corporate.value;
    corporate.value = '';
    corporate.value = oldCorporate;

    const oldPassword = password.value;
    password.value = '';
    password.value = oldPassword;
  }

  
</script>

<template>

  <Sucess v-show="sucessMsg"></Sucess>
  <Loading v-show="loadingData" class="fade-in"></Loading>

  <h1>{{ msg }}</h1>

  <div class="main-content">
    <form class="mbc-form">
      <div class="steps">
        <p>Etapa <span class=""><strong>{{ currentStep }}</strong> de 04</span></p>
      </div>
      
      <section v-if="currentStep == '1' || currentStep == '4'" class="fade-in">
        <h2 v-show="currentStep == '1'">Seja Bem-vindo(a)</h2>
        <h2 v-show="currentStep == '4'">Revise suas informações</h2>
        <div id="email" class="form-input">
          <label>Endereço de e-mail</label>
          <input inputmode="text" v-bind:class = "(emailError)?'input-wrapper input-error':'input-wrapper'" type="email" v-model="email">
          <small class="error" v-show="emailError">Por favor digite um e-mail válido.</small>
        </div>
        <div id="email" v-bind:class = "(naturallegalPersonError)?'form-input radio-list radio-list-error':'form-input radio-list'">
          <label for="natural_person"><input type="radio" id="natural_person" name="naturalLegalPerson" value="natural" v-model="naturalLegalPerson" /> Pessoa física</label>
          <label for="legal_person"><input type="radio" id="legal_person" name="naturalLegalPerson" value="legal" v-model="naturalLegalPerson" /> Pessoa jurídica</label>
        </div>
        <small class="error" v-show="naturallegalPersonError">Por favor escolha uma opção.</small>
        <div  class="form-input form-buttons" v-show="currentStep == '1'">
          <button type="button" @click="validateStep1">Continuar</button>
        </div>
      </section>

      <section v-if="(currentStep == '2' && naturalLegalPerson == 'natural') || (currentStep == '4' && naturalLegalPerson == 'natural')" class="fade-in">
        <h2 v-show="currentStep == '2'">Pessoa física</h2>
        <div id="nome" class="form-input">
          <label>Nome</label>
          <input inputmode="text" v-bind:class = "(nameError)?'input-wrapper input-error':'input-wrapper'" type="text" v-model="name">
          <small class="error" v-show="nameError">Por favor digite seu nome.</small>
        </div>
        <div id="nome" class="form-input">
          <label>CPF</label>
          <input inputmode="text" maxlength = "14" @input="maskCpf" v-bind:class = "(cpfError)?'input-wrapper input-error':'input-wrapper'" type="text" v-model="cpf">
          <small class="error" v-show="cpfError">Por favor digite CPF corretamente.</small>
        </div>
        <div id="nome" class="form-input">
          <label>Data de nascimento</label>
          <input inputmode="date" v-bind:class = "(birthError)?'input-wrapper input-error':'input-wrapper'" type="date" v-model="birth">
          <small class="error" v-show="birthError">Por favor digite a data corretamente.</small>
        </div>
        <div id="nome" class="form-input">
          <label>Telefone</label>
          <input inputmode="text" maxlength = "14" @input="maskTelephone" v-bind:class = "(telephoneError)?'input-wrapper input-error':'input-wrapper'" type="text" v-model="telephone">
          <small class="error" v-show="telephoneError">Por favor digite o Telefone corretamente.</small>
        </div>

        <div  class="form-input form-buttons" v-show="currentStep == '2'">
          <button class="back-button" @click="returnStep('1')">Voltar</button>
          <button type="button" @click="validateStep2">Continuar</button>
        </div>
      </section>

      <section v-if="(currentStep == '2' && naturalLegalPerson == 'legal') || (currentStep == '4' && naturalLegalPerson == 'legal')" class="fade-in">
        <h2 v-show="currentStep == '2'">Pessoa jurídica</h2>
        <div id="nome" class="form-input">
          <label>Razão social</label>
          <input inputmode="text" v-bind:class = "(corporateError)?'input-wrapper input-error':'input-wrapper'" type="text" v-model="corporate">
          <small class="error" v-show="corporateError">Por favor digite a razão social.</small>
        </div>
        <div id="nome" class="form-input">
          <label>CNPJ</label>
          <input inputmode="text" maxlength = "18" @input="maskCnpj" v-bind:class = "(cnpjError)?'input-wrapper input-error':'input-wrapper'" type="text" v-model="cnpj">
          <small class="error" v-show="cnpjError">Por favor digite o CNPJ corretamente.</small>
        </div>
        <div id="nome" class="form-input">
          <label>Data de abertura</label>
          <input inputmode="date" v-bind:class = "(openingError)?'input-wrapper input-error':'input-wrapper'" type="date" v-model="opening">
          <small class="error" v-show="openingError">Por favor digite a data corretamente.</small>
        </div>
        <div id="nome" class="form-input">
          <label>Telefone</label>
          <input inputmode="text" maxlength = "14" @input="maskTelephone" v-bind:class = "(telephoneCorporateError)?'input-wrapper input-error':'input-wrapper'" type="text" v-model="telephoneCorporate">
          <small class="error" v-show="telephoneCorporateError">Por favor digite o Telefone corretamente.</small>
        </div>

        <div  class="form-input form-buttons" v-show="currentStep == '2'">
          <button class="back-button" @click="returnStep('1')">Voltar</button>
          <button type="button" @click="validateStep2">Continuar</button>
        </div>
      </section>

      <section v-if="currentStep == '3' || currentStep == '4'" class="fade-in">
        <h2 v-show="currentStep == '3'">Senha de acesso</h2>
        <div id="nome" class="form-input">
          <label>Sua senha</label>
          <input inputmode="text" v-bind:class = "(passwordError)?'input-wrapper input-error':'input-wrapper'" type="text" v-model="password">
          <small class="error" v-show="passwordError">Por favor digite sua senha.</small>
        </div>

        <div class="form-input form-buttons" v-show="currentStep == '3'">
          <button class="back-button" @click="returnStep('2')">Voltar</button>
          <button type="button" @click="validateStep3">Continuar</button>
        </div>

        <div class="form-input form-buttons" v-show="currentStep == '4'">
          <button type="button" class="back-button" @click="returnStep('3')">Voltar</button>
          <button type="button" @click="registerData">Cadastrar</button>
        </div>

      </section>

    </form>
  </div>
</template>