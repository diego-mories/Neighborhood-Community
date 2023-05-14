<template>
  <div class="screen">
    <div class="row" id="grid-top-log">
      <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
      <NavBarOwner v-if="role === 3" id="full"></NavBarOwner>
    </div>
    <div class="row" id="grid-top">
      <div class="row" id="topR">
        <div class="col-sm-1" id="full">
          <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('login')">VOLVER</button>
        </div>
        <div class="col-sm-11" id="full">
          <span class="title"><b>Entregas</b></span>
        </div>
      </div>
      <div class="row" id="bottomR-middle">
        <div class="col-sm-2" id="full">
        </div>
        <div class="col-sm-9" id="full">
          <b-calendar block></b-calendar>
        </div>
        <div class="col-sm-1" id="full">
        </div>
      </div>
      <div class="row" id="bottomR-bottom">
        <div class="col-sm-3" id="full"></div>
        <div class="col-sm-3" id="full">
          <b-time locale="en" @context="onContext" for="checkbox-1" :disabled="anyHour"></b-time>
          <div class=" center-form mt-3">
            <input class="m-2" type="checkbox" v-model="anyHour" name="anyHour"/>
            <span for="anyHour">Cualquier hora</span>
          </div>
        </div>
        <div class="col-sm-6" id="full">
          <b-button variant="outline-primary" type="submit">AÑADIR</b-button>
        </div>
      </div>
    </div>
    <div class="row" id="grid-bottom">
      <footer-social-network></footer-social-network>
    </div>
  </div>
</template>

<script>

import FooterSocialNetwork from '../components/FooterSocialNetwork.vue'
import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
export default {
  components: {
    FooterSocialNetwork,
    NavBarPresident,
    NavBarOwner
  },
  data () {
    return {
      anyHour: false,
      role: null
    }
  },
  created () {
    let dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.role = dataUserLogin.role
  }
}
</script>

<style>
#img-container-home{
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/comunidad.jpg');
  background-size: cover;
      -moz-background-size: cover;
      -webkit-background-size: cover;
      -o-background-size: cover;
  opacity: 75%;
}
</style>
