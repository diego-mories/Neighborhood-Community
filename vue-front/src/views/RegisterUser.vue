<template>
<div class="screen">
  <div class="row" id="grid-top-log">
      <NavBarPresident id="full"></NavBarPresident>
  </div>
  <div class="row" id="grid-top">
    <div class="row" id="topR">
      <div class="col-sm-1" id="full">
          <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/login')">Volver</button>
      </div>
      <div class="col-sm-11" id="full">
          <span class="title"><b>Alta Usuario</b></span>
      </div>
    </div>
    <div class="row" id="bottomR">
      <div class="col-sm-1" id="full">
      </div>
      <div class="col-sm-11" id="full">
        <template v-if="formDoorman">
          <b-button class="mt-3" variant="outline-primary" @click.prevent="changeAddDoorman()">Cambiar de formulario</b-button>
          <template v-if="addDoormanExist">
            <RegisterDoormanFormExist class="center-form"></RegisterDoormanFormExist>
          </template>
          <template v-else>
            <RegisterDoormanForm class="center-form"></RegisterDoormanForm>
          </template>
        </template>
        <template v-else>
           <template v-if="addHouse">
            <div class="row">
              <div class="col-3">
              </div>
              <div class="col-6">
                <div class="row">
                  <div class="col"><b-button  variant="outline-primary" @click.prevent="changeAddHouse()">Volver al otro formulario</b-button></div>
                </div>
              </div>
            </div>
            <RegisterUserOther class="center-form"></RegisterUserOther>
          </template>
          <template v-if="addHouseOtherC">
            <div class="row">
              <div class="col-3">
              </div>
              <div class="col-6">
                <div class="row">
                  <div class="col"><b-button  variant="outline-primary" @click.prevent="changeAddHouseOtherC()">Volver al otro formulario</b-button></div>
                </div>
              </div>
            </div>
            <RegisterUserOtherCForm class="center-form"></RegisterUserOtherCForm>
          </template> 
          <template v-if="!addHouse && !addHouseOtherC">
            <div class="row">
              <div class="col-3">
              </div>
              <div class="col-6">
                <div class="row">
                  <div class="col"><b-button  variant="outline-primary" @click.prevent="changeAddHouse()">Registrar vivienda a un usuario existente de esta comunidad</b-button></div>
                  <div class="col"><b-button  variant="outline-primary" @click.prevent="changeAddHouseOtherC()">Registrar vivienda a un usuario existente de otra comunidad</b-button></div>
                </div>
              </div>
            </div>
            <RegisterUserForm class="center-form"></RegisterUserForm>
          </template>
        </template>
      </div>
      </div>
    </div>
  <div class="row" id="grid-bottom-home">
    <FooterSocial id="full"></FooterSocial>
  </div>
</div>
</template>

<script>
import RegisterUserForm from '../components/RegisterUserForm.vue'
import RegisterUserOtherCForm from '../components/RegisterUserOtherCForm.vue'
import RegisterUserOther from '../components/RegisterUserOther.vue'
import RegisterDoormanForm from '../components/RegisterDoormanForm.vue'
import RegisterDoormanFormExist from '../components/RegisterDoormanFormExist.vue'
import FooterSocial from '../components/FooterSocialNetwork.vue'
import NavBarPresident from '../components/NavBarPresident.vue'
import servicesDB from '../services/servicesDB'
export default {
  components: {
    RegisterUserForm,
    RegisterDoormanFormExist,
    RegisterUserOtherCForm,
    RegisterUserOther,
    RegisterDoormanForm,
    FooterSocial,
    NavBarPresident
  },
  data () {
    return {
      userLogin: null,
      formDoorman: false,
      addHouse: false,
      addHouseOtherC: false,
      addDoormanExist: false,
    }
  },
  created () {
    this.getData()
    this.searchDoorman()
  },
  methods: {
    searchDoorman () {
      servicesDB.searchDoorman(this.userLogin.community_id).then(
        Response => {
          if (Response.data.exist) {
            this.formDoorman = true
          }
        },
        Error => {
          console.log('Error al obtener informacion del portero')
        }
      )
    },
    getData () {
      this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
      this.searchDoorman()
    },
    changeAddDoorman () {
      this.addDoormanExist = !this.addDoormanExist
    },
    changeAddHouse () {
      this.addHouse = !this.addHouse
    },
    changeAddHouseOtherC () {
      this.addHouseOtherC = !this.addHouseOtherC
    },
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
