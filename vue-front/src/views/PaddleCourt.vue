<template>
  <div class="screen">
    <div class="row" id="grid-top-log">
      <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
      <NavBarOwner v-if="role === 3" id="full"></NavBarOwner>
    </div>
    <div cLass="row" id="grid-top">
        <div class="row" id="topR">
          <div class="col-sm-1" id="full">
              <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/bookingCourts')">VOLVER</button>
          </div>
          <div class="col-sm-11" id="full" >
              <span class="title"><b> Pista de padel</b></span>
          </div>
        </div>
        <div class="row" id="bottomR-middle">
          <div class="col-sm-1" id="full">
          </div>
          <div class="col-sm-4" id="full">
            <div class="row">
            <span><img class="center-form" src="../assets/images/paddle.png"></span>
            <template v-if="has_book">
              <div>MIS RESERVAS: {{myBook}}</div>
            <div><b-button class="btn-danger" @click="cancelBookP()">CANCELAR RESERVA</b-button></div>
            </template>
          </div>
          </div>
          <div class="col-sm-7 d-block" id="full">
            <b-table class="mr-5 ml-5 mt-2" :items="items" :fields="fields" :select-mode="'single'" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected">
              <template #cell(is_available)="data">
                {{ data.item.is_available | formatBooking}}
              </template>
            </b-table>
            <h3><span class="badge badge-info" id="msg1">Seleccione una hora de reserva</span></h3>
          </div>
        <div class="row" id="bottomR-bottom">
          <div class="col-sm-5" id="full">
          </div>
          <div class="col-sm-7" id="full">
            <b-button id="myBtn" variant="outline-primary" type="submit" @click="reserve()">RESERVAR</b-button>
            <h3><span class="badge badge-danger" id="msg"></span></h3>
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
import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
import BookingsServices from '../services/Bookings'
export default {
  components: {
    FooterSocial,
    NavBarPresident,
    NavBarOwner
  },
  data () {
    return {
      role: null,
      fields: [
        {key: 'is_available', label: 'Disponibilidad', tdClass: 'table-title', thClass: 'table-title'},
        {key: 'time_zone', label: 'Horario', tdClass: 'table-title', thClass: 'table-title'}
      ],
      items: [],
      selectMode: 'single',
      selected: [],
      dataUserLogin: {},
      has_book: false,
      myBook: ''
    }
  },
  mounted () {
    document.getElementById('myBtn').hidden = true
    document.getElementById('msg').hidden = true
    document.getElementById('msg1').hidden = false
  },
  created () {
    this.dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.role = this.dataUserLogin.role_id
    this.getData()
    this.has_book = false
  },
  methods: {
    onRowSelected (items) {
      this.selected = items
      console.log(this.selected[0])
      if (this.selected[0].is_available === 0) {
        document.getElementById('msg1').hidden = true 
        document.getElementById('myBtn').hidden = true 
        document.getElementById('msg').textContent = 'Seleccione una hora disponible para reservar'
        document.getElementById('msg').hidden = false
      } else {
        document.getElementById('msg1').hidden = true 
        document.getElementById('myBtn').hidden = false 
        document.getElementById('msg').hidden = true
      }
    },
    getData () {
      BookingsServices.findBookingsP(this.dataUserLogin.community_id).then(
        Response => {
          this.items = Response.data
          console.log(Response.data)
        },
        Error =>{
          console.log('Error al buscar las reservas disponibles de la pista de padel' + Error)
        }
      )
      BookingsServices.findMyBookP(this.dataUserLogin).then(
        Response => {
          console.log(Response.data.rowCount)
          if (Response.data.rowCount.length > 0){
            this.has_book = true
            this.myBook = Response.data.rowCount[0].time_zone
            console.log(this.myBook)
          }
        },
        Error => {
          console.log('Error al buscar si tengo alguna reserva de padel' + Error)
        }
      )
    },
    reserve () {
      BookingsServices.reserveP(this.dataUserLogin,this.selected).then(
        Response => {
          console.log(Response.data)
          if (Response.data.available) {
            this.$swal.fire({
              icon: 'success',
              title: 'Reserva de pista de padel realizada correctamente!!',
              showConfirmButton: false,
              timer: 2500
            }).then(()=> {this.$router.push({ path: '/login' })})
          } 
          else {
            this.$swal.fire({
              icon: 'error',
              title: 'Usted ya ha realizado una reserva a las: ' + Response.data.hour + '\nEspere a mañana para realizar otra reserva',
              showConfirmButton: false,
              timer: 2500
            }).then(()=> {this.$router.push({ path: '/login' })})
          }
        }, 
        Error => {
          console.log('Error al reservar la pista de padel' + Error)
        }
      ) 
    },
    cancelBookP() {
      BookingsServices.cancelBookP(this.dataUserLogin,this.myBook).then(
        Response => {
          this.$swal.fire({
            icon: 'success',
            title: 'Reserva de pista de padel cancelada correctamente!!',
            showConfirmButton: false,
            timer: 2500
          }).then(()=> {
            console.log('Reserva de pista de padel cancelada correctamente' + Response)
            this.$router.push({ path: '/login' })
          })
        }, 
        Error => {
          console.log('Error al cancelar la reserva' + Error)
        }
      )
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
