<template>
<div class="screen">
  <div class="row" id="grid-top-log">
    <NavBar id="full"></NavBar>
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
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterSocialNetwork.vue'
export default {
  components: {
    NavBar,
    Footer
  }
}
</script>

<style>
</style>
