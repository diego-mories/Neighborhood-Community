<template>
    <!-- <nav class="navbar navbar-dark bg-dark fixed-top">
        <router-link to="/profile">
            <a class="navbar-brand" href="" >
                <img src="../assets/images/perfil.png" width="30" height="30" class="d-inline-block align-top" alt="">
                {{name + ' ' + surname}}        
            </a>
        </router-link>
        
    </nav> -->
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>  -->
    <!-- <div class="row" id="NavBar">
        <nav class="navBarP" toggleable="lg" type="dark">
            <div v-if="confCommunity.has_paddle_court || confCommunity.has_tennis_court" class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/bookingCourts" exact>
                    RESERVA PISTAS
                    <font-awesome-icon icon="fa-solid fa-table-tennis-paddle-ball"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/notices" exact>
                    CONVOCATORIAS
                    <font-awesome-icon icon="fa-solid fa-thumbtack"/>
                </router-link>
            </div>
            <div v-if="confCommunity.has_pool" class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/tickets" exact>
                    ENVIAR TICKETS
                    <font-awesome-icon icon="fa-solid fa-ticket"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/registerUser" exact>
                    ALTA USUARIOS
                    <font-awesome-icon icon="fa-solid fa-user-alt"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/bills" exact>
                    SUBIR CUENTAS
                    <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/spills" exact>
                    SUBIR DERRAMAS
                    <font-awesome-icon icon="fa-solid fa-file-invoice"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/payments" exact>
                    MIS PAGOS
                    <font-awesome-icon icon="fa-solid fa-file-zipper"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <button type="button" class="bootstrap-btn" @click="$router.push('/profile')">{{name + ' ' + surname}} (P)</button>
                <button type="button" class="bootstrap-btn" @click="deleteDataUserLogin()"><font-awesome-icon icon="fa-solid fa-sign-out-alt"/></button>
            </div>
        </nav>
    </div> -->
    <div>
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top" class="navbar-style">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <router-link tag="span" active-class="active" to="/profile" exact style="cursor: pointer;">
        <b-navbar-brand class="ml-3"> 
          <img src="../assets/images/perfil.png" class="profile-img" >{{ name }}
        </b-navbar-brand>
      </router-link>
      <font-awesome-icon icon="fa-solid fa-power-off" class="log-out" />

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
              SUBIR CUENTAS
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
