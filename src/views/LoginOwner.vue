<template>
    <div class="rowHome">
        <div class="colHome">
            <NavBar></NavBar>
        </div>
        <div class="row" style="height: 100%; display: flex;">
          <div class="col"><img src="../assets/logo.png"></div>
          <div class="col">
            <div class="row" >Hola 1</div>
            <div class="row">Hola 2</div>
          </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import ColumnaImg from '../components/ColumnaImg.vue'
export default {
  components: {
    NavBar,
    ColumnaImg
  }

}
</script>

<style>
</style>
