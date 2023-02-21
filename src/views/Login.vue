<template>
<div class="screen">
  <div class="row" id="grid-top-log">
    <NavBarPresident id="full"></NavBarPresident>
    <!-- <NavBarOwner id="full"></NavBarOwner> -->
  </div>
  <div class="row" id="grid-bottom-log">
    <div class="col-6" id="full">
      <img class="centerImage" src="../assets/logo.png">
    </div>
    <div class="col-6" id="full">
      <div class="row" id="graph-top">
      </div>
      <div class="row" id="graph-bottom">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
import Footer from '../components/FooterSocialNetwork.vue'
export default {
  components: {
    NavBarPresident,
    NavBarOwner,
    Footer
  }
}
</script>

<style>
</style>
