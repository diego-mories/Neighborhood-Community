<template>
  <div class="container-fluid bg-svg d-flex flex-column" style="min-height:1297px">
    <div class="row">
      <NavBarPresident v-if="role === 1"></NavBarPresident>
      <NavBarOwner v-if="role === 3"></NavBarOwner>
    </div>
    <div class="row" style="margin-top: 80px; ">
      <b-col>
        <router-link to="/login">
          <div class="back">
            <span class="d-none d-lg-block">VOLVER</span>
            <font-awesome-icon icon="fa-solid fa-tent-arrow-turn-left" style="font-size: 30px; "></font-awesome-icon> 
          </div>
        </router-link>
      </b-col>
    </div>
    <div class="row">
      <b-col>
        <span class="title"><b>RESERVA DE PISTAS</b></span>
      </b-col>
    </div>
    <div class="row flex-grow-1 d-flex">
      <div v-if="confCommunity.has_tennis_court" class="col m-auto">
        <router-link to="/tennisCourt"><img src="../assets/images/tennis.png" id="courts"></router-link>
      </div>
      <div v-if="confCommunity.has_paddle_court" class="col m-auto" >
        <router-link to="/paddleCourt"><img  src="../assets/images/paddle.png" id="courts"></router-link>
      </div>
    </div>
    <div class="row">
      <b-col>
        <FooterSocialNetwork></FooterSocialNetwork>
      </b-col>
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
  data: () => ({
    role: null,
    dataUserLogin: {},
    confCommunity: {}
  }),
  created () {
    this.dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.role = this.dataUserLogin.role_id
    this.confCommunity = JSON.parse(localStorage.getItem('confCom'))
  }
}
</script>

<style>
.bg-svg {
  background-image: url('../assets/subtle-prism3.png'); /* Ruta del archivo SVG */
  background-repeat: no-repeat;
  background-size: cover;
}
.back {
  float: left; 
  margin-left: 10px ; 
  cursor: pointer;
  color: #494440;
}
.back:hover {
  color: #82766d;
}
</style>
