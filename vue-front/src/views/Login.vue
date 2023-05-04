<template>
<div class="screen">
  <div class="row" id="grid-top-log">
    <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
    <NavBarBuildingDoorman v-if="role === 2" id="full"></NavBarBuildingDoorman>
    <NavBarOwner v-if="role === 3" id="full"></NavBarOwner>
    <NavBarAdmin v-if="this.dataUserLogin.is_admin" id="full"></NavBarAdmin>
  </div>
  <!-- Vista de Presidente -->
  <div class="row" id="grid-bottom-log" v-if="role === 1">
    <div class="col-6" id="full">
      <ViewsCardsP></ViewsCardsP>
    </div>
    <div class="col-6" id="full">
      <div class="container">
          <h3 class="mt-5 mb-0 pb-0">DEUDAS</h3>
          <b-table
          class="m-5 "
          style="overflow-y:auto; height: 25vh !important;"
          ref="debsTable"
          id="debsTable"
          :fields="headers"
          :items="debs"
            responsive="sm">
            <template #cell(date_p)="data">
              {{ data.item.date_p | formatDate}}
            </template>
            <template #cell(amount)="data">
              {{ data.item.amount | formatAmount}}
            </template>
            <template #cell(type_bill)="data">
              {{ data.item.type_bill | formatBill}}
            </template>
            <template #cell(options)="data">
              <b-button class="btn btn-success" v-b-tooltip.hover title="Pagar" @click="openPay(data.item)">
                <font-awesome-icon icon="fa-solid fa-money-check-alt" />
              </b-button>
            </template>
          </b-table>
        </div>
        <div class="container">
          <h3 class=" mb-0 pb-0">GASTOS COMUNIDAD</h3>
          <b-table
          class="m-5 "
          style="overflow-y:auto;height: 25vh !important;"
          ref="debsTable"
          id="debsTable"
          :fields="headers2"
          :items="bills"
          responsive="sm">
          <template #cell(date_p)="data">
              {{ data.item.date_p | formatDate}}
          </template>
          <template #cell(amount)="data">
              {{ data.item.amount | formatAmount}}
          </template>
          <template #cell(type_id)="data">
            {{ data.item.type_id  | formatBill}}
          </template>
          </b-table>
        </div>
    </div>
  </div>
  <!-- Vista de portero -->
  <div class="row" id="grid-bottom-log" v-if="role === 2">
    <div class="col-6" id="full">
      <ViewsCardsB></ViewsCardsB>
    </div>
    <div class="col-6" id="full">
      Calendario para revisar las entregas de los propietarios
    </div>
  </div>
  <!-- Vista de propietario -->
  <div class="row" id="grid-bottom-log" v-if="role === 3">
    <div class="col-6" id="full">
      <ViewsCardsO></ViewsCardsO>
    </div>
    <div class="col-6" id="full">
      <div class="container">
          <h3 class="mt-5 mb-0 pb-0">DEUDAS</h3>
          <b-table
          class="m-5 "
          style="overflow-y:auto; height: 60vh !important;"
          ref="debsTable"
          id="debsTable"
          :fields="headers"
          :items="debs"
          responsive="sm">
          <template #cell(date_p)="data">
              {{ data.item.date_p | formatDate}}
          </template>
          <template #cell(amount)="data">
              {{ data.item.amount | formatAmount}}
            </template>
          <template #cell(type_bill)="data">
              {{ data.item.type_bill | formatBill}}
          </template>
          <template #cell(options)="data">
              <b-button class="btn btn-success" v-b-tooltip.hover title="Pagar" @click="openPay(data.item)">
                <font-awesome-icon icon="fa-solid fa-money-check-alt" />
              </b-button>
            </template>
          </b-table>
      </div>
    </div>
  </div>
    <!-- Vista de admin -->
  <div class="row" id="grid-bottom-log" v-if="this.dataUserLogin.is_admin">
    <b-table class="container m-0" :items="items" :fields="fields">
    </b-table>
  </div>
  <div class="row" id="grid-bottom">
      <Footer></Footer>
  </div>
</div>
</template>

<script>
import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
import NavBarAdmin from '../components/NavBarAdmin.vue'
import NavBarBuildingDoorman from '../components/NavBarBuildingDoorman.vue'
import Footer from '../components/FooterSocialNetwork.vue'
import ViewsCardsP from '../components/ViewsCardsP.vue'
import ViewsCardsO from '../components/ViewsCardsO.vue'
import ViewsCardsB from '../components/ViewsCardsB.vue'
import Services from '../services/servicesDB'
export default {
  data: () => ({
    role: null,
    dataUserLogin: {},
    debs: [],
    headers: [
      { key: 'amount', sortable: true, label: 'Cantidad', tdClass: 'table-title', thClass: 'table-title' },
      { key: 'type_bill', label: 'Tipo de gasto' },
      { key: 'date_p', sortable: true, label: 'Fecha' },
      { key: 'options', label: 'Pagar' }
    ],
    bills: [],
    headers2: [
      { key: 'amount', sortable: true, label: 'Cantidad', tdClass: 'table-title', thClass: 'table-title' },
      { key: 'type_id', label: 'Tipo de gasto' },
      { key: 'date_p', sortable: true, label: 'Fecha' }
    ],
    fields: [
      {key: 'name', label: 'Nombre'},
      {key: 'floors', label: 'Plantas'},
      {key: 'doors', label: 'Puertas'},
      {key: 'paddle', label: 'Pista de Padel'},
      {key: 'tennis', label: 'Pista de Tenis'},
      {key: 'pool', label: 'Piscina'},
      {key: 'doorman', label: 'Portero'},
      {key: 'cameras', label: 'Camaras'}
    ],
    items: [],
    communities: []
  }),
  components: {
    NavBarPresident,
    NavBarOwner,
    NavBarAdmin,
    NavBarBuildingDoorman,
    ViewsCardsP,
    ViewsCardsO,
    ViewsCardsB,
    Footer
  },
  created () {
    this.getData()
  },
  methods: {
    openPay (row) {
      this.$swal.fire({
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        title: 'Pago en curso...!!'
      }).then(() => {
        Services.pay(row).then(
          Response => {
            if (Response.status === 200) {
              this.$swal.fire({
                icon: 'success',
                title: 'REALIZADO CORRECTAMENTE!!',
                text: Response.data.message
              }).then(() => {
                this.getData()
              })
            }
          },
          Error => {
            console.log('Error al pagar')
          }
        )
      })
    },
    getData () {
      this.dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
      this.role = this.dataUserLogin.role_id
      if (this.dataUserLogin.is_admin) {
        Services.searchDBCommunities().then(
          Response => {
            this.communities = Response.data.communities
            for (let community of this.communities) {
              if (community.floors === 0 && community.doors === 0) {
                this.items.push({name: '☣️  Requiere configuración del presidente ☣️  (' + community.name + ')', floors: '🫙 ', doors: '🫙 ', paddle: '🫙 ', tennis: '🫙 ', pool: '🫙 ', doorman: '🫙 ', cameras: '🫙 '})
                continue
              }
              if (community.has_paddle_court) {
                community.has_paddle_court = '✅'
              } else {
                community.has_paddle_court = '❌'
              }
              if (community.has_tennis_court) {
                community.has_tennis_court = '✅'
              } else {
                community.has_tennis_court = '❌'
              }
              if (community.has_pool) {
                community.has_pool = '✅'
              } else {
                community.has_pool = '❌'
              }
              if (community.has_building_doorman) {
                community.has_building_doorman = '✅'
              } else {
                community.has_building_doorman = '❌'
              }
              if (community.has_cameras) {
                community.has_cameras = '✅'
              } else {
                community.has_cameras = '❌'
              }
              this.items.push({name: community.name, floors: community.floors, doors: community.doors, paddle: community.has_paddle_court, tennis: community.has_tennis_court, pool: community.has_pool, doorman: community.has_building_doorman, cameras: community.has_cameras})
            }
          },
          Error => {
            console.log('Error al obtener informacion sobre la base de datos de las comunidades registradas en la plataforma')
          }
        )
      }
      let data = {
        community_id: this.dataUserLogin.community_id,
        door: this.dataUserLogin.door,
        floor: this.dataUserLogin.floor
      }
      if (this.role === 1) {
        Services.findAllBills(data.community_id).then(Response => { console.log(Response.data.dataResponse); this.bills = Response.data.dataResponse }, Error => { console.log('Error al obtener los datos de las cuentas') })
      }
      Services.findAllDebs(data).then(
        Response => {
          this.debs = Response.data.dataResponse
        },
        Error => {
          console.log('Error al buscar datos de deudas')
        }
      )
    }
  }
}
</script>

<style>

</style>
