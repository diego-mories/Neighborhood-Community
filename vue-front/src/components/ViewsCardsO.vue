<template>
    <div class="container center-form" id="full">
        <b-row class="cards mb-2" id="full">
            <b-col v-if="confCommunity.has_paddle_court || confCommunity.has_tennis_court" class="col-lg-2 col-md-10 col-sm-10" id="full">
                <router-link class="btn buttonHomeMenu" tag="li" active-class="active" to="/bookingCourts" exact>
                        <!-- ICON COURTS --> <font-awesome-icon icon="fa-solid fa-table-tennis-paddle-ball"/>
                </router-link>
                <p>RESERVAS</p>
            </b-col>
            <b-col v-if="confCommunity.has_pool" class="col-lg-2 col-md-10 col-sm-10 align-items: center" id="full">
                <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/deliveries" exact>
                        <!-- ICON DELIVERIES --> <font-awesome-icon icon="fa-solid fa-ticket"/>
                </router-link>
                <p>TICKETS</p>
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
