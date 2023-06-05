<template>
  <div class="container-fluid bg-svg d-flex flex-column" style="min-height:1329px">
    <div class="row">
      <NavBarPresident v-if="role === 1"></NavBarPresident>
      <NavBarOwner v-if="role === 3"></NavBarOwner>     
    </div>
    <div class="row" style="margin-top: 120px;">
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
        <span class="title"><b>ENVIAR TICKETS</b></span>
      </b-col>
    </div>
    <div class="row d-flex">
      <div>
        <span><img height="175" width="350" src="../assets/images/ticket.png"></span>
      </div>
    </div>
    <div class="row flex-grow-1 d-flex">
      <div class="col-8 ml-auto mr-auto mb-auto" style="margin-top: 180px;">
        <TicketsForm></TicketsForm>
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
import TicketsForm from '../components/TicketsForm.vue'
import NavBarPresident from '../components/NavBarPresident.vue'
export default {
  components: {
    FooterSocialNetwork,
    TicketsForm,
    NavBarPresident
  },
  data () {
    return {
      role: null
    }
  },
  created () {
    this.dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.role = this.dataUserLogin.role_id
  }
}
</script>

<style>

.form-container {
  padding: 20px;
}
</style>
