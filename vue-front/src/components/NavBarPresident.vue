<template>
    <div>
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top" class="navbar-style">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <router-link tag="span" active-class="active" to="/profile" exact style="cursor: pointer;">
        <b-navbar-brand class="ml-3"> 
          <img src="../assets/images/perfil.png" class="profile-img" >{{ name }}
        </b-navbar-brand>
      </router-link>
      <font-awesome-icon icon="fa-solid fa-power-off" class="log-out" @click="deleteDataUserLogin"/>
      <b-collapse is-nav id="nav-collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="confCommunity.has_paddle_court || confCommunity.has_tennis_court">
            <router-link tag="span" active-class="active" to="/bookingCourts" exact>
              RESERVA PISTAS
              <font-awesome-icon icon="fa-solid fa-table-tennis-paddle-ball" />
            </router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link tag="span" active-class="active" to="/notices" exact>
              CONVOCATORIAS
              <font-awesome-icon icon="fa-solid fa-thumbtack" />
            </router-link>
          </b-nav-item>

          <b-nav-item v-if="confCommunity.has_pool">
            <router-link tag="span" active-class="active" to="/tickets" exact>
              ENVIAR TICKETS
              <font-awesome-icon icon="fa-solid fa-ticket" />
            </router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link tag="span" active-class="active" to="/registerUser" exact>
              ALTA USUARIOS
              <font-awesome-icon icon="fa-solid fa-user-alt" />
            </router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link tag="span" active-class="active" to="/bills" exact>
              SUBIR FACTURAS
              <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />
            </router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link tag="span" active-class="active" to="/spills" exact>
              SUBIR DERRAMAS
              <font-awesome-icon icon="fa-solid fa-file-invoice" />
            </router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link tag="span" active-class="active" to="/payments" exact>
              MIS PAGOS
              <font-awesome-icon icon="fa-solid fa-file-zipper" />
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
  data: () => ({
    name: '',
    surname: '',
    confCommunity: {}
  }),
  created () {
    let dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.name = dataUserLogin.name
    this.surname = dataUserLogin.surname
    this.confCommunity = JSON.parse(localStorage.getItem('confCom'))
  },
  methods: {
    deleteDataUserLogin () {
      console.log('Borramos los datos del usuario logueado')
      localStorage.removeItem('userLogin')
      localStorage.removeItem('confCom')
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>

</style>
