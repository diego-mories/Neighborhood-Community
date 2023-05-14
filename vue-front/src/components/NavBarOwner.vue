<template>
    <div class="row" id="NavBar">
        <nav class="navBarO" toggleable="lg" type="dark">
            <div v-if="confCommunity.has_paddle_court || confCommunity.has_tennis_court" class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/bookingCourts" exact>
                    RESERVA PISTAS
                    <!-- ICON COURTS --> <font-awesome-icon icon="fa-solid fa-table-tennis-paddle-ball"/>
                </router-link>
            </div>
            <div v-if="confCommunity.has_pool" class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/deliveries" exact>
                    ENVIAR TICKETS
                    <!-- ICON DELIVERIES --> <font-awesome-icon icon="fa-solid fa-ticket"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/payments" exact>
                    MIS PAGOS
                    <!-- ICON BILLS --> <font-awesome-icon icon="fa-solid fa-file-zipper"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <button type="button" class="bootstrap-btn" @click="$router.push('/profile')">{{name + ' ' + surname}} (O)</button>
                <button type="button" class="bootstrap-btn" @click="deleteDataUserLogin()"><font-awesome-icon icon="fa-solid fa-sign-out-alt"/></button>
            </div>
        </nav>
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
      localStorage.removeItem('confCom')
      localStorage.removeItem('userLogin')
      this.$router.push({ path: '/' })

    //   history.pushState(null, null, location.href)
    //   history.back()
    //   history.forward()
    //   window.onpopstate = function () { history.go(1) }
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
