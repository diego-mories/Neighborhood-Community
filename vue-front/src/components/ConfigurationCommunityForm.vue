<template>
<div>
    <b-button variant="outline-primary" type="submit" @click="cancelConf()">Cancelar configuración</b-button>
    <b-form>
    <span><img class="w-25 h-25 mw-25 mh-25" src="../assets/images/community.png"></span>
    <div class="input-group mb-3 d-flex">
        <b-form-input type="number" class="form-control w-5 mr-1" min="0" max="10" placeholder="Plantas" v-model="confCommunity.floors"></b-form-input>
        <b-form-input type="number" class="form-control w-5 mr-1" min="0" max="10" placeholder="Pisos" v-model="confCommunity.doors"></b-form-input>
        <b-form-input type="number" class="form-control w-5 mr-1" min="0" max="10" placeholder="Mi planta" v-model="confCommunity.myFLoor"></b-form-input>
        <b-form-input type="number" class="form-control w-5 mr-1" min="0" max="10" placeholder="Mi piso" v-model="confCommunity.myDoor"></b-form-input>
    </div>
    <div class="input-group mb-3 d-flex justify-content-center">
        <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.paddle"/>
        <span class="d-flex align-items-center">¿Hay pista de padel?</span>
        <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.tennis"/>
        <span class="d-flex align-items-center">¿Hay pista de tenis?</span>
        <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.pool"/>
        <span class="d-flex align-items-center">¿Hay piscina?</span>
        <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.doorman"/>
        <span class="d-flex align-items-center">¿Hay portero?</span>
    </div>
    <b-button variant="outline-primary" type="submit" @click.prevent="saveConf()">Guardar configuración</b-button>
    <span>Checked names: {{ confCommunity }}</span>
    </b-form>
  </div>
  </template>

<script>
import Services from '../services/servicesDB'
export default {
  data: () => ({
    confCommunity: {
      paddle: false,
      tennis: false,
      pool: false,
      doorman: false
    }
  }
  ),
  methods: {
    cancelConf () {
      localStorage.removeItem('userLogin')
      this.$router.push('/')
      history.pushState(null, null, location.href)
      history.back()
      history.forward()
      window.onpopstate = function () { history.go(1) }
    },
    saveConf () {
      // Actualizamos en nuestro localStorage first_time a 0
      let userLogin = JSON.parse(localStorage.getItem('userLogin'))
      console.log(this.confCommunity)
      console.log(userLogin)
      userLogin.first_time = 0
      localStorage.removeItem('userLogin')
      localStorage.setItem('userLogin', JSON.stringify(userLogin))
      // Actualizamos en base de datos el first_time a 0
      Services.firstTimeNew(userLogin.id).then(
        Response => {
          this.$router.push('/login')
        },
        Error => {
          console.log('Error en cambio desde FRONT de first_time')
        }
      )
    }
  }
}
</script>

<style>

</style>
