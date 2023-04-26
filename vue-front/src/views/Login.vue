<template>
<div class="screen">
  <div class="row" id="grid-top-log">
    <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
    <NavBarBuildingDoorman v-if="role === 2" id="full"></NavBarBuildingDoorman>
    <NavBarOwner v-if="role === 3" id="full"></NavBarOwner>
    <NavBarAdmin v-if="role === 4" id="full"></NavBarAdmin>
  </div>
  <!-- Vista de Presidente -->
  <div class="row" id="grid-bottom-log" v-if="role === 1">
    <div class="col-6" id="full">
      <ViewsCardsP></ViewsCardsP>
    </div>
    <div class="col-6" id="full">
      <div class="container">
          <h3 class="mt-5 mb-0 pb-0">Gastos propios</h3>
          <b-table
          class="m-5 "
          style="overflow-y:scroll; height: 25vh !important;"
          ref="debsTable"
          id="debsTable"
          :fields="headers"
          :items="debs"
          responsive="sm">
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
          <h3 class=" mb-0 pb-0">Gastos comunidad</h3>
          <b-table
          class="m-5 "
          style="overflow-y:scroll;height: 25vh !important;"
          ref="debsTable"
          id="debsTable"
          :fields="headers"
          :items="debs"
          responsive="sm">
            <template #cell(type_bill)="data">
              {{ data.item.type_bill | formatBill}}
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
          <h3 class="mt-5 mb-0 pb-0">Gastos propios</h3>
          <b-table
          class="m-5 "
          style="overflow-y:scroll; height: 60vh !important;"
          ref="debsTable"
          id="debsTable"
          :fields="headers"
          :items="debs"
          responsive="sm">
            <template #cell(type_bill)="data">
              {{ data.item.type_bill | formatBill}}
            </template>
          </b-table>
      </div>
    </div>
  </div>
    <!-- Vista de admin -->
  <div class="row" id="grid-bottom-log" v-if="role === 4">
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
    debs: [],
    headers: [
      { key: 'amount', sortable: true, label: 'Cantidad', tdClass: 'table-title', thClass: 'table-title' },
      { key: 'type_bill', label: 'Tipo de gasto' },
      { key: 'date_p', label: 'Fecha' },
      { key: 'options', label: 'Pagar' }
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
  mounted () {
    this.getData()
  },
  methods: {
    openPay (row) {
      console.log(row)
      this.$swal.fire({
        title: 'Do you want to pay?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal.fire('Saved!', '', 'success')
          // Servicio de marcar como pagado
          // Recargar datos
          this.getData()
        } else if (result.isDenied) {
          this.$swal.fire('Pay not saved', '', 'info')
        }
      })
    },
    getData () {
      let dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
      this.role = dataUserLogin.role
      if (this.role === 1) {
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
        community_id: dataUserLogin.community_id,
        door: dataUserLogin.door,
        floor: dataUserLogin.floor
      }
      // console.log(data)
      Services.findAllDebs(data).then(
        Response => {
          this.debs = Response.data.dataResponse
          console.log(Response.data.dataResponse)
        },
        Error => {

        }
      )
    }
  }
}
</script>

<style>

</style>
