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
      <div class="row" id="graph-top">
      </div>
      <div class="row" id="graph-bottom">
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
      Grafica en medio de este lado actual del propietario
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
    let dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.role = dataUserLogin.role
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
        console.log(this.items)
      },
      Error => {
        console.log('Error al obtener informacion sobre la base de datos de las comunidades registradas en la plataforma')
      }
    )
  }
}
</script>

<style>
</style>
