<template>
<div class="screen">
  <div class="row" id="GridTop">
    <NavBar></NavBar>
  </div>
  <div class="row" id="GridBottom">
    <div class="col" id="GridBottomLeft">
      <span id="logoLeft"><img src="../assets/logo.png"></span>
    </div>
    <div class="col" id="GridBottomRight">
      <div class="row" id="Graph">
      </div>
      <div class="row" id="Graph2">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import ColumnaImg from '../components/ColumnaImg.vue'
import Footer from '../components/FooterSocialNetwork.vue'
export default {
  components: {
    NavBar,
    ColumnaImg,
    Footer
  }

}
</script>

<style>

#GridBottom{
  height: 94%;
  margin: 0;
  padding: 0;
}
#GridTop{
  height: 6%;
}
#GridBottomLeft{
  margin: 0;
  padding: 0;
  width: 50%;
}
#GridBottomRight{
  width: 50%;
  margin: 0;
  padding: 0;
  background-color: rgb(5, 133, 90);
}
#Graph{
  height: 50%;
  margin: 0;
  padding: 0;
  background-color: rgb(52, 52, 52);
}
#Graph2{
  height: 50%;
  margin: 0;
  padding: 0;
  background-color: rgb(246, 246, 246);
}
#logoLeft{
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
