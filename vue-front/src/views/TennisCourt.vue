<template>
  <!-- <div class="screen">
    <div class="row" id="grid-top-log">
      <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
      <NavBarOwner v-if="role === 3" id="full"></NavBarOwner>
    </div>
    <div class="row" id="grid-top">
      <div class="row" id="topR">
        <div class="col-sm-1" id="full">
            <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/bookingCourts')">VOVLER</button>
        </div>
        <div class="col-sm-11" id="full" >
            <span class="title"><b> Pista de tenis</b></span>
        </div>
      </div>
      <div class="row" id="bottomR-middle">
        <div class="col-sm-1" id="full">
        </div>
        <div class="col-sm-4" id="full">
          <div class="row">
            <span><img class="center-form" src="../assets/images/tennis.png"></span>
            <template v-if="has_book">
              <div>MIS RESERVAS: {{myBook}}</div>
            <div><b-button class="btn-danger" @click="cancelBookT()">CANCELAR RESERVA</b-button></div>
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
    <div class="row" id="grid-bottom-home">
      <FooterSocial id="full"></FooterSocial>
    </div>
  </div> -->
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
        <span class="title"><b>PISTA DE TENIS</b></span>
      </b-col>
    </div>
    
  <template v-if="!has_book">
    <div class="row flex-grow-1 d-flex" style="margin-top:50px">
      <div class="col-lg-8 col-md-9 mr-auto ml-auto">
          <div class="container">
            <div class="table-container mx-auto">
              <b-table
              :items="items" 
              :fields="fields" 
              :select-mode="'single'" 
              responsive="sm" 
              ref="selectableTable" 
              selectable
              @row-selected="onRowSelected"
              head-variant="dark">
              <template #cell(is_available)="data">
                  {{ data.item.is_available | formatBooking}}
              </template>
            </b-table>
            </div>
            <h3><span class="badge msg-info-book" id="msg1">Seleccione una hora de reserva</span></h3>
            <b-button id="myBtn" variant="outline-primary" type="submit" class="custom-button" @click="reserve()">RESERVAR</b-button>
            <h3><span class="badge badge-danger" id="msg"></span></h3>        
          </div>
      </div>
    </div>
  </template>
    <template v-else>
      <div class="row" style="margin-top:50px">
      <div class="col-lg-8 col-md-9 mr-auto ml-auto">
          <div class="container">
            <div class="table-container mx-auto">
              <b-table
              :items="items" 
              :fields="fields" 
              :select-mode="'single'" 
              responsive="sm" 
              ref="selectableTable" 
              selectable
              @row-selected="onRowSelected"
              head-variant="dark">
              <template #cell(is_available)="data">
                  {{ data.item.is_available | formatBooking}}
              </template>
            </b-table>
            </div>
            <h3><span class="badge msg-info-book" id="msg1">Seleccione una hora de reserva</span></h3>
            <b-button id="myBtn" variant="outline-primary" type="submit" class="custom-button" @click="reserve()">RESERVAR</b-button>
            <h3><span class="badge badge-danger" id="msg"></span></h3>        
          </div>
      </div>
    </div>
      <div class="row flex-grow-1 d-flex">
        <div class="col ml-auto mr-auto">
          <div>MIS RESERVAS: {{myBook}}</div><b-button class="btn-danger" @click="cancelBookT()">CANCELAR RESERVA</b-button>   
        </div>
      </div>
    </template>
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
import BookingsServices from '../services/Bookings'
export default {
  components: {
    FooterSocialNetwork,
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
    getData() {
      BookingsServices.findBookingsT(this.dataUserLogin.community_id).then(
        Response => {
          this.items = Response.data
        },
        Error =>{
          console.log('Error al buscar las reservas disponibles de la pista de tenis' + Error)
        }
      )
      BookingsServices.findMyBookT(this.dataUserLogin).then(
        Response => {
          if (Response.data.rowCount.length > 0){
            this.has_book = true
            this.myBook = Response.data.rowCount[0].time_zone
          }
        },
        Error => {
          console.log('Error al buscar si tengo alguna reserva de tenis' + Error)
        }
        
      )
    },
    reserve () {
      BookingsServices.reserveT(this.dataUserLogin,this.selected).then(
        Response => {
          if (Response.data.available) {
            this.$swal.fire({
              icon: 'success',
              title: 'Reserva de pista de tenis realizada correctamente!!',
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
          console.log('Error al reservar la pista de tenis' + Error)
        }
      ) 
    },
    cancelBookT() {
      BookingsServices.cancelBookT(this.dataUserLogin,this.myBook).then(
        Response => {
          this.$swal.fire({
            icon: 'success',
            title: 'Reserva de pista de tenis cancelada correctamente!!',
            showConfirmButton: false,
            timer: 2500
          }).then(()=> {
            console.log('Reserva de la pista de tenis cancelada correctamente' + Response)
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
.custom-button {
  background-color: #05506b;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.custom-button:hover {
  background-color: #237b9b;
}
.msg-info-book {
  background-color: #05506b;
}
</style>
