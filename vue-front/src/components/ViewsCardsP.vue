<template>
<div class="container center-form" id="full">
    <b-row class="cards mb-2" id="full">
        <b-col v-if="confCommunity.has_paddle_court || confCommunity.has_tennis_court" class="col-lg-2 col-md-10 col-sm-10" id="full">
            <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/bookingCourts" exact>
                    <!-- ICON COURTS --> <font-awesome-icon icon="fa-solid fa-table-tennis-paddle-ball"/>
            </router-link>
            <p>RESERVAS</p>
        </b-col>
        <b-col class="col-lg-2 col-md-10 col-sm-10" id="full">
            <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/notices" exact>
                    <!-- ICON NOTICES --> <font-awesome-icon icon="fa-solid fa-thumbtack"/>
            </router-link>
            <p> CONVOCATORIAS</p>
        </b-col>
        <b-col v-if="confCommunity.has_pool" class="col-lg-2 col-md-10 col-sm-10 align-items: center" id="full">
            <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/tickets" exact>
                    <!-- ICON DELIVERIES --> <font-awesome-icon icon="fa-solid fa-ticket"/>
            </router-link>
            <p>TICKETS</p>
        </b-col>
        <b-col class="col-lg-2 col-md-10 col-sm-10" id="full">
            <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/registerUser" exact>
                    <!-- ICON REGISTER --> <font-awesome-icon icon="fa-solid fa-user-alt"/>
            </router-link>
            <p>ALTA</p>
        </b-col>
    </b-row>
    <b-row class="cards mb-2" id="full">
        <b-col class="col-lg-2 col-md-10 col-sm-10 align-items: center" id="full">
            <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/bills" exact>
                    <!-- ICON DELIVERIES --> <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket"/>
            </router-link>
            <p>SUBIR CUENTAS</p>
        </b-col>
        <b-col class="col-lg-2 col-md-10 col-sm-10 align-items: center" id="full">
            <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/spills" exact>
                    <!-- ICON DELIVERIES --> <font-awesome-icon icon="fa-solid fa-file-invoice"/>
            </router-link>
            <p>SUBIR DERRAMAS</p>
        </b-col>
        <b-col class="col-lg-2 col-md-10 col-sm-10" id="full">
            <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/payments" exact>
                    <!-- ICON BILLS --> <font-awesome-icon icon="fa-solid fa-file-zipper"/>
            </router-link>
            <p>PAGOS</p>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
  data: () => ({
    confCommunity: {}
  }),
  created () {
    this.confCommunity = JSON.parse(localStorage.getItem('confCom'))
  }
}
</script>

<style>

</style>
