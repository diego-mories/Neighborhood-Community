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
          <b-nav-item>
            <router-link tag="span" active-class="active" to="/cameras" exact>
              CÁMARAS
              <font-awesome-icon icon="fa-solid fa-video"/>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link tag="span" active-class="active" to="/contact" exact>
              CONTACTAR CON PROPIETARIO
              <font-awesome-icon icon="fa-solid fa-address-book"/>
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
    surname: ''
  }),
  created () {
    let dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.name = dataUserLogin.name
    this.surname = dataUserLogin.surname
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
