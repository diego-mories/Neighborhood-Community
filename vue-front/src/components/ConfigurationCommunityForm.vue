<template>
<div>
    <b-button variant="outline-primary" type="submit" @click="cancelConf()">Cancelar configuración</b-button>
    <b-form>
    <span><img class="w-25 h-25 mw-25 mh-25" src="../assets/images/community.png"></span>
    <div class="input-group mb-3 ">
        <select class="form-select" aria-label="Default select example">
        <option selected>¿Hay portero?</option>
        <option value="1">Si</option>
        <option value="2">No</option>
        </select>
        <div class="m-2 d-inline-flex justify-content-center">
            <input class="m-2" type="checkbox" id="cameras"/>
            <span class="d-flex align-items-center">¿Hay cámaras?</span>
        </div>
    </div>
    <div class="input-group mb-3 d-flex">
        <b-form-input type="number" class="form-control w-5 mr-1" min="0" max="10" placeholder="Plantas"></b-form-input>
        <b-form-input type="number" class="form-control w-5 mr-1" min="0" max="10" placeholder="Pisos"></b-form-input>
    </div>
    <div class="input-group mb-3 d-flex justify-content-center">
        <input class="m-2" type="checkbox" id="cameras"/>
        <span class="d-flex align-items-center">¿Hay pista de padel?</span>
        <input class="m-2" type="checkbox" id="cameras"/>
        <span class="d-flex align-items-center">¿Hay pista de tenis?</span>
    </div>
    <b-button variant="outline-primary" type="submit" @click.prevent="saveConf()">Guardar configuración</b-button>
    </b-form>
  </div>
  </template>

<script>
import Services from '../services/servicesDB'
export default {
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

        }
      )
    }
  }
}
</script>

<style>

</style>
