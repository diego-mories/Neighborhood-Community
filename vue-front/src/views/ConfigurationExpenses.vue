<template>
<div class="screen">
  <div class="row" id="grid-top">
    <div class="row" id="full">
      <div class="row" id="topR">
        <div class="col-sm-1" id="full">
            <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/Profile')">Volver</button>
        </div>
        <div class="col-sm-11" id="full">
            <span class="title"><b>Configuración gastos</b></span>
        </div>
      </div>
      <div class="row" id="bottomR">
        <div class="col-sm-1" id="full">
        </div>
        <div class="col-sm-11" id="full">
            <ConfigurationExpensesForm class="center-form"></ConfigurationExpensesForm>
        </div>
        </div>
      </div>
    </div>
  <div class="row" id="grid-bottom-home">
    <FooterSocial id="full"></FooterSocial>
  </div>
</div>
</template>

<script>
import FooterSocial from '../components/FooterSocialNetwork.vue'
import ConfigurationExpensesForm from '../components/ConfigurationExpensesForm.vue'
export default {
  components: {
    FooterSocial,
    ConfigurationExpensesForm
  }
}
</script>

<style>
</style>
