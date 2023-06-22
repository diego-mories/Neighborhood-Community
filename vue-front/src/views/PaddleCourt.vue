<template>
  <div class="container-fluid bg-svg d-flex flex-column" style="min-height:1329px">
    <div class="row">
      <NavBarPresident v-if="role === 1"></NavBarPresident>
      <NavBarOwner v-if="role === 3"></NavBarOwner>
    </div>
    <div class="row" style="margin-top: 80px; ">
      <b-col>
        <router-link to="/booking-courts">
          <div class="back">
            <span class="d-none d-lg-block">VOLVER</span>
            <font-awesome-icon icon="fa-solid fa-tent-arrow-turn-left" style="font-size: 30px; "></font-awesome-icon> 
          </div>
        </router-link>
      </b-col>
    </div>
    <div class="row">
      <b-col>
        <span class="title"><b>PISTA DE PADEL</b></span>
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
          <div>MIS RESERVAS: {{myBook}}</div><b-button class="btn-danger" @click="cancelBookP()">CANCELAR RESERVA</b-button>   
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

</style>
