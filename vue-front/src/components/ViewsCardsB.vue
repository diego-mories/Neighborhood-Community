<template>
    <div class="container center-form" id="full">
        <b-row class="cards mb-2" id="full">
            <b-col  v-if="confCommunity.has_cameras"  class="col-lg-2 col-md-10 col-sm-10" id="full">
                <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/cameras" exact>
                    <!-- ICON VIDEO --> <font-awesome-icon icon="fa-solid fa-video"/>
                </router-link>
                <p>CÁMARAS</p>
            </b-col>
            <b-col  class="col-lg-2 col-md-10 col-sm-10" id="full">
                <router-link class="btn btn-dark buttonHomeMenu" tag="li" active-class="active" to="/contact" exact>
                  <font-awesome-icon icon="fa-solid fa-address-book"/>
                </router-link>
                <p>CONTACTAR</p>
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
    console.log(this.confCommunity)
  }
}
</script>

<style>

</style>
