<template>
<div class="container-fluid bg-svg d-flex flex-column" style="min-height:1329px">
  <div class="row">
    <NavBarPresident v-if="role === 1"></NavBarPresident>
    <NavBarBuildingDoorman v-if="role === 2"></NavBarBuildingDoorman>
    <NavBarOwner v-if="role === 3"></NavBarOwner>
    <NavBarAdmin v-if="this.dataUserLogin.is_admin"></NavBarAdmin>
  </div>
  <!-- Vista de Presidente -->
  <div class="row" style="margin-top:123px" v-if="role === 1">
    <div class="col-lg-8 col-md-9 mr-auto ml-auto">
        <div class="container">
          <h2>DEUDAS</h2>
          <div class="table-container mx-auto">
          <b-table
            style="overflow-y: auto; max-height: 350px;"
            ref="debsTable"
            id="debsTable"
            :fields="headers"
            :items="debs"
            responsive="sm"
            head-variant="dark"
            :td-class="'text-center align-middle custom-cell'"
          >
            <template #cell(date_p)="data">
              {{ data.item.date_p | formatDate}}
            </template>
            <template #cell(description)="data">
              {{ data.item.description | formatDescription}}
            </template>
            <template #cell(amount)="data">
              {{ data.item.amount | formatAmount}}
            </template>
            <template #cell(type_bill)="data">
		          {{data.item.type_bill | formatBill}}
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
  </div>
  <div class="row" style="margin-top:23px" v-if="role === 1">
    <div class="col-lg-8 col-md-9 mr-auto ml-auto">
        <div class="container">
          <h2>GASTOS ORDINARIOS</h2>
          <div class="table-container mx-auto">
            <b-table
            style="overflow-y: auto;max-height: 350px;"
            ref="debsTable"
            id="debsTable"
            :fields="headers2"
            :items="bills"
            responsive="sm"
            head-variant="dark"
            :td-class="'text-center align-middle custom-cell'"
            >
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
  </div>
  <div class="row flex-grow-1"  v-if="role === 1">
    <div class="d-none d-lg-flex" style="margin-top: 30px;margin-left: 15px; margin-bottom:50px">
      <ViewsCardsP></ViewsCardsP>
    </div>
  </div>  
  <!-- Vista de portero -->
  <div class="row flex-grow-1"  v-if="role === 2">
    <div style="margin-top: 30px;margin-left: 15px; margin-bottom:50px">
      <ViewsCardsB></ViewsCardsB>
    </div>
  </div>
  <!-- Vista de propietario -->
  <div class="row" style="margin-top:123px" v-if="role === 3">
    <div class="col-lg-8 col-md-9 mr-auto ml-auto">
        <div class="container">
          <h2>DEUDAS</h2>
          <div class="table-container mx-auto">
          <b-table
            style="overflow-y: auto; max-height: 350px;"
            ref="debsTable"
            id="debsTable"
            :fields="headers"
            :items="debs"
            responsive="sm"
            head-variant="dark"
          >
            <template #cell(date_p)="data">
              {{ data.item.date_p | formatDate}}
            </template>
            <template #cell(description)="data">
              {{ data.item.description | formatDescription}}
            </template>
            <template #cell(amount)="data">
              {{ data.item.amount | formatAmount}}
            </template>
            <template #cell(type_bill)="data">
		          {{data.item.type_bill | formatBill}}
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
  </div>
  <div class="row flex-grow-1"  v-if="role === 3">
    <div class="d-none d-lg-flex" style="margin-top: 30px;margin-left: 15px; margin-bottom:50px">
      <ViewsCardsO></ViewsCardsO>
    </div>
  </div>
    <!-- Vista de admin -->
  <div class="row flex-grow-1" style="margin-top:123px" v-if="this.dataUserLogin.is_admin">
    <div class="col-lg-8 col-md-9 mr-auto ml-auto">
        <div class="container">
          <h1>COMUNIDADES</h1>
          <div class="table-container mx-auto">
          
          <b-table 
          style="overflow-y: auto; overflow-x: auto;max-height: 350px;"
            ref="debsTable"
            id="debsTable"
            :items="items" 
            :fields="fields"
            responsive="sm"
            head-variant="dark">
            </b-table>
          </div>
        </div>
    </div>
  </div>
  <div class="row">
    <b-col>
      <Footer></Footer>
    </b-col>
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
import CommunityServices from '../services/Community'
import BillsSpillsServices from '../services/Bills_Spills'

export default {
  data: () => ({
    role: null,
    dataUserLogin: {},
    debs: [],
    headers: [
    { key: 'type_bill', label: 'Tipo', thClass: 'position-sticky' },
    { key: 'date_p', sortable: true, label: 'Fecha',thClass: 'position-sticky'  },

      { key: 'description', label: 'Descripción',thClass: 'position-sticky'  },
      { key: 'amount', sortable: true, label: 'Cantidad', tdClass: 'table-title', thClass: 'table-title position-sticky'},

      { key: 'options', label: 'Pagar',thClass: 'position-sticky'  }
    ],
    bills: [],
    headers2: [
      { key: 'type_id', label: 'Tipo' },
      { key: 'date_p', sortable: true, label: 'Fecha' },
      { key: 'amount', sortable: true, label: 'Cantidad', tdClass: 'table-title'},
    ],
    fields: [
      {key: 'name', label: 'Nombre'},
      {key: 'floors', label: 'Plantas'},
      {key: 'doors', label: 'Puertas'},
      {key: 'paddle', label: 'Pista de Padel'},
      {key: 'tennis', label: 'Pista de Tenis'},
      {key: 'pool', label: 'Piscina'},
      {key: 'doorman', label: 'Portero'},
      {key: 'cameras', label: 'Cámaras'}
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
        BillsSpillsServices.pay(row).then(
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
            console.log('Error al pagar' + Error)
          }
        )
      })
    },
    getData () {
      this.dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
      this.role = this.dataUserLogin.role_id
      if (this.dataUserLogin.is_admin) {
        CommunityServices.searchDBCommunities().then(
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
            console.log('Error al obtener informacion sobre la base de datos de las comunidades registradas en la plataforma' + Error)
          }
        )
      } else {
        let data = {
          community_id: this.dataUserLogin.community_id,
          door: this.dataUserLogin.door,
          floor: this.dataUserLogin.floor
        }
        if (this.role === 1) {
          BillsSpillsServices.findAllBills(data.community_id).then(Response => { console.log(Response.data.dataResponse); this.bills = Response.data.dataResponse }, Error => { console.log('Error al obtener los datos de las cuentas' + Error) })
        }
        BillsSpillsServices.findAllDebs(data).then(
          Response => {
            this.debs = Response.data.dataResponse
            console.log(this.debs)
          },
          Error => {
            console.log('Error al buscar datos de deudas' + Error)
          }
        )
      }
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
.table-container table thead {
  position: sticky;
  top: 0;
  background-color: #05506b !important;
  z-index: 1;
}

</style>
