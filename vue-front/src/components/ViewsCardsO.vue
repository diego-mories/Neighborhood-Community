<template>
    <div class="m-auto">
    <b-row>
        <b-col v-if="confCommunity.has_paddle_court || confCommunity.has_tennis_court" >
            <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/bookingCourts" exact>
                <font-awesome-icon icon="fa-solid fa-table-tennis-paddle-ball"/>
            </router-link>
            <p>RESERVAS</p>
        </b-col>
        <b-col v-if="confCommunity.has_pool">
            <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/tickets" exact>
                <font-awesome-icon icon="fa-solid fa-ticket"/>
            </router-link>
            <p>TICKETS</p>
        </b-col>
        <b-col>
            <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/payments" exact>
                <font-awesome-icon icon="fa-solid fa-file-zipper"/>
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
