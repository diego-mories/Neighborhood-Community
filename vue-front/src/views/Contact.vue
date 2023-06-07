<template>
    <!-- <div class="screen">
      <div class="row" id="grid-top-log">
        <NavBarBuildingDoorman  id="full"></NavBarBuildingDoorman>
      </div>
      <div class="row" id="grid-top">
        <div class="row" id="topR">
          <div class="col-sm-1" id="full">
            <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('login')">VOLVER</button>
          </div>
          <div class="col-sm-11" id="full">
            <span class="title"><b>Contactar con propietario</b></span>
          </div>
        </div>
        <div class="row" id="bottomR">
          <div class="col-1" id="full">
          </div>
          <div class="col-3 m-auto" id="full">
            <span><img class="w-25 h-25 mw-25 mh-25 mb-5" src="../assets/images/.png"></span>
            <div class="input-group mb-3 d-flex justify-content-center">
              <b-form-group>
                  <div class="input-group">
                    <label class="label-login">Selecciona el propietario</label>
                    <b-form-select
                    v-model="selected"
                    id="input-house"
                    name="input-house"
                    v-validate="{ required: true}"
                    :state="validateState('input-house')"
                    :options="options"
                    aria-describedby="input-house-live-feedback">
                    </b-form-select>
                    <b-form-invalid-feedback id="input-house" class="msgE">
                    {{ veeErrors.first('input-house')?'Elige una opción':'' }}
                    </b-form-invalid-feedback>
                    <label class="label-login">Descripción</label>
                    <b-form-textarea
                        v-model="msg"
                        id="input-msg"
                        name="input-msg"
                        v-validate="{ required: true }"
                        type="text"
                        rows="7"
                        class="form-control"
                        aria-describedby="input-msg-live-feedback"
                        :state="validateState('input-msg')"
                    ></b-form-textarea>
                    <b-form-invalid-feedback id="input-msg" class="msgE2">
                        {{ veeErrors.first('input-msg')?'Campo obligatorio':'' }}
                    </b-form-invalid-feedback>
                  </div>
              </b-form-group>
            </div>
            <div class="input-group mb-3 d-flex justify-content-center">
              <b-form-group>
                <b-button class="m-3" variant="outline-primary" type="submit" @click="contact()">CONTACTAR</b-button>
              </b-form-group>
            </div>
          </div>
        </div>
      </div>
      <div class="row" id="grid-bottom">
        <footer-social-network></footer-social-network>
      </div>
    </div> -->
    <div class="container-fluid bg-svg d-flex flex-column" style="min-height:1329px">
      <div class="row">
        <NavBarBuildingDoorman></NavBarBuildingDoorman>
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
          <span class="title"><b>CONTACTAR CON PROPIETARIO</b></span>
        </b-col>
      </div>
      <div class="row mt-5 d-flex">
        <b-col>
          <span><img height="150" width="150" src="../assets/images/contacto.png"></span>
        </b-col>
      </div>
      <div class="row flex-grow-1 d-flex">
        <div class="col-8 mr-auto ml-auto mb-auto mt-5">
          <div class="input-group d-flex justify-content-center">
            <b-form-group>
                  <div class="input-group">
                    <label class="label-login">Selecciona el propietario</label>
                    <b-form-select
                    v-model="selected"
                    id="input-house"
                    name="input-house"
                    v-validate="{ required: true}"
                    :state="validateState('input-house')"
                    :options="options"
                    aria-describedby="input-house-live-feedback">
                    </b-form-select>
                    <b-form-invalid-feedback id="input-house" class="msgE">
                    {{ veeErrors.first('input-house')?'Elige una opción':'' }}
                    </b-form-invalid-feedback>
                    <label class="label-login">Mensaje</label>
                    <b-form-textarea
                        v-model="msg"
                        id="input-msg"
                        name="input-msg"
                        v-validate="{ required: true }"
                        type="text"
                        rows="7"
                        class="form-control"
                        aria-describedby="input-msg-live-feedback"
                        :state="validateState('input-msg')"
                    ></b-form-textarea>
                    <b-form-invalid-feedback id="input-msg" class="msgE2">
                        {{ veeErrors.first('input-msg')?'Campo obligatorio':'' }}
                    </b-form-invalid-feedback>
                  </div>
              </b-form-group>
          </div>
        </div>
        <div class="row d-flex flex-grow-1">
        <div class="col-8 m-auto mt-0">
          <b-form-group>
            <b-button class="m-1 custom-button" variant="outline-primary" type="submit" @click="contact()">CONTACTAR</b-button>
          </b-form-group>
        </div>
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
  import NavBarBuildingDoorman from '../components/NavBarBuildingDoorman.vue'
  import UsersServices from '../services/Users'
  import CommunityServices from '../services/Community'
  export default {
    components: {
      FooterSocialNetwork,
      NavBarBuildingDoorman,
    },
    created () {
      this.dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
      this.role = this.dataUserLogin.role_id
      this.getData()
    },
    data () {
      return {
        dataUserLogin: {},
        msg: '',
        arrayPeople: [],
        Ids: [],
        copyArrayIds: [],
        selected: null,
        options: [],
        ownersFD: [],
        arrayIds: []
      }
    },
    methods: {
      getData () {
        CommunityServices.searchOwnersDF(this.dataUserLogin.community_id).then(
            Response => {
              this.ownersFD = Response.data.rowCount
              for (let owner of this.ownersFD) {
                this.arrayIds.push(owner.user_id)
              }
              let copyIds = this.arrayIds.filter((item, index) => {
                return this.arrayIds.indexOf(item) === index
              })
              for (let id of copyIds) {
                UsersServices.findOne(id).then(
                  Response => {
                    this.options.push({value: {id: Response.data.rowCount[0].id, email: Response.data.rowCount[0].email}, text: Response.data.rowCount[0].name + ' ' + Response.data.rowCount[0].surname + ' (' + Response.data.rowCount[0].email + ')'})
                  },
                  Error => {
                    console.log('Error al obtener los datos del usuario a través del id' + Error)
                  })
              }
            },
            Error => {
             console.log('Error al obtener los datos de los propietarios de la comunidad' + Error)
            })
        },
        contact () {
          this.$validator.validateAll(['input-msg','input-house']).then(result => {
            if (!result) {
            return 
            } else {
              UsersServices.contact(this.msg,this.selected.email).then(
                Response => {
                  if (Response.status === 200) {
                    this.$swal.fire({
                    icon: 'success',
                    text: 'Mensaje de contacto enviado correctamente'
                    }).then(() => {
                    this.$router.push({ path: '/login' })
                    })
                  }
                },
                Error => {
                  console.log('Error al contactar con el propietario' + Error)
                }
              )
            }
          })
        },
        validateState (ref) {
        if (
            this.veeFields[ref] &&
            (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) {
            return !this.veeErrors.has(ref)
        }
        return null
        }
    }
  }
  </script>
  
  <style>
  </style>
  