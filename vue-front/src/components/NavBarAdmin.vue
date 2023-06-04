<template>
    <div>
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top" class="navbar-style">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <router-link tag="span" active-class="active" to="/profile" exact style="cursor: pointer;">
        <b-navbar-brand class="ml-3"> 
          <img src="../assets/images/perfil.png" class="profile-img" >ADMIN
        </b-navbar-brand>
      </router-link>
      <font-awesome-icon icon="fa-solid fa-power-off" class="log-out" @click="deleteDataUserLogin"/>
      <b-collapse is-nav id="nav-collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link tag="span" active-class="active" to="/newCommunity" exact>
              CREAR COMUNIDAD
              <font-awesome-icon icon="fa-solid fa-group-arrows-rotate"/>           
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
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
#NavBar{
    width: 100%;
    height: 100%;
    padding: 0%;
    margin: 0%;
    background-color: aqua;
}
</style>
