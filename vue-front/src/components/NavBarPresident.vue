<template>
    <div class="row" id="NavBar">
        <nav class="navBarP" toggleable="lg" type="dark">
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/bookingCourts" exact>
                    RESERVA PISTAS
                    <!-- ICON COURTS --> <font-awesome-icon icon="fa-solid fa-table-tennis-paddle-ball"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/notices" exact>
                    CONVOCATORIAS
                    <!-- ICON NOTICES --> <font-awesome-icon icon="fa-solid fa-thumbtack"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/deliveries" exact>
                    ENVIAR TICKETS
                    <!-- ICON DELIVERIES --> <font-awesome-icon icon="fa-solid fa-ticket"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/registerUser" exact>
                    ALTA USUARIOS
                    <!-- ICON NEW USER --> <font-awesome-icon icon="fa-solid fa-user-alt"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/bills" exact>
                    SUBIR CUENTAS
                    <!-- ICON BILLS --> <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/spills" exact>
                    SUBIR DERRAMAS
                    <!-- ICON BILLS --> <font-awesome-icon icon="fa-solid fa-file-invoice"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/payments" exact>
                    MIS PAGOS
                    <!-- ICON BILLS --> <font-awesome-icon icon="fa-solid fa-file-zipper"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <button type="button" class="bootstrap-btn" @click="$router.push('/profile')">{{name + ' ' + surname}} (P)</button>
                <button type="button" class="bootstrap-btn" @click="deleteDataUserLogin()"><font-awesome-icon icon="fa-solid fa-sign-out-alt"/></button>
            </div>
        </nav>
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
      this.$router.push({ path: '/' })
      localStorage.removeItem('userLogin')
      history.pushState(null, null, location.href)
      history.back()
      history.forward()
      window.onpopstate = function () { history.go(1) }
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
}
</style>
