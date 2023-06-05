<template>
  <div class="container-fluid bg-svg d-flex flex-column" style="min-height:1329px">
    <div class="row">
      <NavBarPresident></NavBarPresident>
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
        <span class="title"><b>ALTA USUARIO</b></span>
      </b-col>
    </div>
    <!-- EXISTE PORTERO EN LA COMUNIDAD Y LE DAMOS DE ALTA -->
    <template v-if="formDoorman">
      <div class="row d-flex">
        <div>
          <span><img height="185" width="200" src="../assets/images/doorman.png"></span>
        </div>
      </div>
      <div class="row d-flex">
        <div class="col-8 m-auto">
          <b-form-group>
            <b-button class="m-3 custom-button" variant="outline-primary" @click.prevent="changeAddDoorman()">CABMIO DE FORMULARIO</b-button>
          </b-form-group>
        </div>
      </div>  
      <div class="row flex-grow-1 d-flex">
        <div class="col-8 col-lg-4 ml-auto mr-auto mb-auto">
            <template v-if="addDoormanExist">
              <RegisterDoormanFormExist></RegisterDoormanFormExist>
            </template>
            <template v-else>
              <RegisterDoormanForm></RegisterDoormanForm>
            </template>
        </div>
      </div>
    </template>
    <!-- DAMOS DE ALTA A PROPIETARIOS -->
    <template v-else>
      <div class="row d-flex">
        <div>
          <span><img height="185" width="200" src="../assets/images/newuser.png"></span>
        </div>
      </div>
      <template v-if="addHouse">
        <div class="row d-flex">
          <div class="col-8 m-auto">
            <b-form-group>
              <b-button class="m-3 custom-button" variant="outline-primary" @click.prevent="changeAddHouse()">VOLVER AL OTRO FORMULARIO</b-button>
            </b-form-group>
          </div>
        </div> 
        <div class="row flex-grow-1 d-flex">
          <div class="col-8 col-lg-4 ml-auto mr-auto mb-auto">
            <RegisterUserOther></RegisterUserOther>
          </div>
        </div> 
      </template>
      <template v-if="addHouseOtherC">
        <div class="row d-flex">
          <div class="col-8 m-auto">
            <b-form-group>
              <b-button class="m-3 custom-button" variant="outline-primary" @click.prevent="changeAddHouseOtherC()">VOLVER AL OTRO FORMULARIO</b-button>
            </b-form-group>
          </div>
        </div> 
        <div class="row flex-grow-1 d-flex">
          <div class="col-8 col-lg-4 ml-auto mr-auto mb-auto">
            <RegisterUserOtherCForm></RegisterUserOtherCForm>
          </div>
        </div> 
      </template>
      <template v-if="!addHouse && !addHouseOtherC">
        <div class="row d-flex">
          <div class="col-8 m-auto">
            <b-form-group>
              <b-button class="m-3 custom-button" variant="outline-primary" @click.prevent="changeAddHouse()">REGISTRO DE USUARIO DE ESTA COMUNIDAD</b-button>
              <b-button  class="m-3 custom-button" variant="outline-primary" @click.prevent="changeAddHouseOtherC()">REGISTRO DE UN USUARIO DE OTRA COMUNIDAD</b-button>
            </b-form-group>
          </div>
        </div> 
        <div class="row flex-grow-1 d-flex">
          <div class="col-8 col-lg-4 ml-auto mr-auto mb-auto">
            <RegisterUserForm></RegisterUserForm>
          </div>
        </div> 
      </template>
    </template>
    <div class="row">
      <b-col>
        <FooterSocialNetwork></FooterSocialNetwork>
      </b-col>
    </div>
  </div>
  
<!-- <div class="screen">
  <div class="row" id="grid-top-log">
      <NavBarPresident id="full"></NavBarPresident>
  </div>
  <div class="row" id="grid-top">
    <div class="row" id="topR">
      <div class="col-sm-1" id="full">
          <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/login')">VOLVER</button>
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
          <b-button class="mt-3" variant="outline-primary" @click.prevent="changeAddDoorman()">CABMIO DE FORMULARIO</b-button>
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
                  <div class="col"><b-button  variant="outline-primary" @click.prevent="changeAddHouse()">VOLVER AL OTRO FORMULARIO</b-button></div>
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
                  <div class="col"><b-button  variant="outline-primary" @click.prevent="changeAddHouseOtherC()">VOLVER AL OTRO FORMULARIO</b-button></div>
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
                  <div class="col"><b-button  variant="outline-primary" @click.prevent="changeAddHouse()">REGISTRO DE USUARIO DE ESTA COMUNIDAD</b-button></div>
                  <div class="col"><b-button  variant="outline-primary" @click.prevent="changeAddHouseOtherC()">REGISTRO DE UN USUARIO DE OTRA COMUNIDAD</b-button></div>
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
</div> -->
</template>

<script>
import RegisterUserForm from '../components/RegisterUserForm.vue'
import RegisterUserOtherCForm from '../components/RegisterUserOtherCForm.vue'
import RegisterUserOther from '../components/RegisterUserOther.vue'
import RegisterDoormanForm from '../components/RegisterDoormanForm.vue'
import RegisterDoormanFormExist from '../components/RegisterDoormanFormExist.vue'
import FooterSocialNetwork from '../components/FooterSocialNetwork.vue'
import NavBarPresident from '../components/NavBarPresident.vue'
import CommunityServices from '../services/Community'
export default {
  components: {
    RegisterUserForm,
    RegisterDoormanFormExist,
    RegisterUserOtherCForm,
    RegisterUserOther,
    RegisterDoormanForm,
    FooterSocialNetwork,
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
      CommunityServices.searchDoorman(this.userLogin.community_id).then(
        Response => {
          if (Response.data.exist) {
            this.formDoorman = true
          }
        },
        Error => {
          console.log('Error al obtener informacion del portero' + Error)
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
