<template>
  <div class="screen">
    <div class="row" id="grid-top">
      <div class="col-sm-5" id="full">
        <div id="img-container-home"></div>
      </div>
      <div class="col-sm-7" id="full">
        <div class="row" id="topR">
          <div class="col-sm-1" id="full">
              <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/loginPresident')">Volver</button>
          </div>
          <div class="col-sm-11" id="full" >
              <span class="title"><b> Pista de tenis</b></span>
          </div>
        </div>
        <div class="row" id="bottomR-middle">
          <div class="col-sm-1" id="full">
          </div>
          <div class="col-sm-4" id="full">
            <span><img class="center-form w-100 " src="../assets/images/tennis.png"></span>
          </div>
          <div class="col-sm-7 d-flex" id="full">
            <b-table class=" center-form w-50" striped hover :items="items"></b-table>
          </div>
        </div>
        <div class="row" id="bottomR-bottom">
          <div class="col-sm-5" id="full"></div>
          <div class="col-sm-7" id="full">
            <b-button variant="outline-primary" type="submit">Reservar</b-button>
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
export default {
  components: {
    FooterSocial
  },
  data () {
    return {
      items: [
        {Hora_inicio: '9:00', Hora_Fin: '10:30'},
        {Hora_inicio: '10:30', Hora_Fin: '12:00'},
        {Hora_inicio: '12:00', Hora_Fin: '13:30'},
        {Hora_inicio: '13:30', Hora_Fin: '15:00'},
        {Hora_inicio: '15:00', Hora_Fin: '16:30'},
        {Hora_inicio: '16:30', Hora_Fin: '18:00'},
        {Hora_inicio: '18:00', Hora_Fin: '19:30'},
        {Hora_inicio: '19:30', Hora_Fin: '21:00'},
        {Hora_inicio: '21:00', Hora_Fin: '22:30'}
      ]
    }
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
