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
        <span class="title"><b>CONVOCATORIA DE JUNTAS</b></span>
      </b-col>
    </div>
    <div class="row d-flex">
      <b-col>
        <span><img height="250" width="350" src="../assets/images/18-Tablon-de-Anuncios.png"></span>
      </b-col>
    </div>
    <div class="row flex-grow-1 d-flex">
      <div class="col-8 m-auto">
        <div class="input-group d-flex justify-content-center">
          <b-form-group>
                <div class="input-group">
                  <label class="label-login">Orden del día</label>
                  <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
                  <b-form-input
                      v-model="orderDay"
                      id="input-orderDay"
                      name="input-orderDay"
                      v-validate="{ required: true}"
                      type="text"
                      class="form-control"
                      aria-describedby="input-orderDay-live-feedback"
                      placeholder="Orden del día"
                      :state="validateState('input-orderDay')"
                  ></b-form-input>
                  <label class="label-login">Fecha</label>
                  <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-calendar"/></span>
                  <b-form-input
                    v-model="date"
                    id="input-date"
                    name="input-date"
                    v-validate="{ required: true }"
                    type="date"
                    class="form-control"
                    aria-describedby="input-date-live-feedback"
                    :state="validateState('input-date')"
                  ></b-form-input>
                  <label class="label-login">Hora</label>
                  <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-calendar"/></span>
                  <b-form-input
                    v-model="hour"
                    id="input-hour"
                    name="input-hour"
                    v-validate="{ required: true }"
                    type="time"
                    class="form-control"
                    aria-describedby="input-hour-live-feedback"
                    :state="validateState('input-hour')"
                  ></b-form-input>
                </div>
            </b-form-group>
        </div>
      </div>
      <div class="row d-flex flex-grow-1">
        <div class="col-8 m-auto mt-0">
          <b-form-group>
            <b-button class="m-1 custom-button" variant="outline-primary" type="submit" @click="sendNotice()">ENVIAR ACTA POR CORREO ELECTRÓNICO</b-button>
            <b-button class="m-1 custom-button"  variant="outline-primary" type="submit" @click="printDiv()">IMPRIMIR ACTA</b-button>
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
import NavBarPresident from '../components/NavBarPresident.vue'
import CommunityServices from '../services/Community'
import UsersServices from '../services/Users'
export default {
  components: {
    FooterSocialNetwork,
    NavBarPresident,
  },
  created () {
    this.dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.role = this.dataUserLogin.role_id
    this.getData()
  },
  data () {
    return {
      role: null,
      date: null,
      hour: null,
      orderDay: null,
      dataUserLogin: {},
      arrayPeople: [],
      Ids: [],
      copyArrayIds: []
    }
  },
  methods: {
    getData () {
      CommunityServices.searchOwnersDF(this.dataUserLogin.community_id).then(
        Response => {
          this.arrayPeople = Response.data.rowCount
          for (let id of this.arrayPeople) {
            this.Ids.push(id.user_id)
          }
          this.copyArrayIds = this.Ids.filter((item, index) => {
            return this.Ids.indexOf(item) === index
          })
        },
        Error => {
          console.log('Error al obtener los datos de los propietarios de la comunidad' + Error)
        }
      )
    },
    printDiv () {
    this.$validator.validateAll(['input-date','input-orderDay','input-hour']).then(result => {
        if (!result) {
          return 
        }
        const text = '<p><em>COMUNIDAD DE PROPIETARIOS DE VIVIENDAS</em></p><br><p style="text-align:center"><strong>CONVOCATORIA A JUNTA GENERAL ORDINARIA </strong></p><br>'
        const text2 = '<p>Estimados Señores:</p><br><p> De conformidad con lo dispuesto en la Ley de Propiedad Horizontal, me permito convocarle a la Junta General Ordinaria de esta comunidad, quetendrá lugar el próximo día <span class="Blank Short">  ' + this.date + '</span>, a las: ' + this.hour + ' con arreglo al siguiente:</p>'
        const text3 = '<p style="text-align:center">ORDEN DEL DÍA</p><p>- ' + this.orderDay + '</p>'
        const text4 = '<p style="text-align:center">Fdo. <br></p><p style="text-align:center"> ' + this.dataUserLogin.name + ' ' + this.dataUserLogin.surname + '   </p><br><br><br><br>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -<br><br>'
        var a = window.open('', '', 'height=1000, width=1000')
        a.document.write('<html>')
        a.document.write(text)
        a.document.write(text2)
        a.document.write(text3)
        a.document.write(text4)
        a.document.write('</body></html>')
        a.document.close()
        a.print()
      })
    },
    sendNotice () {
      this.$validator.validateAll(['input-date','input-orderDay','input-hour']).then(result => {
        if (!result) {
          return 
        }
        for (let id of this.copyArrayIds) {
          UsersServices.sendNotice(id, this.date, this.hour, this.orderDay).then(
            Response => {
              this.$swal.fire({
                icon: 'success',
                text: 'Emails enviados con la convocatoria de la junta!!'
              }).then(() => {
                console.log('Convocatoria de junta enviada' + Response)
                this.$router.push('/login')
              })
            },
            Error => {
              console.log('Error en el envio de junta' + Error)
            })
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
