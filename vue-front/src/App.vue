<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.container-fluid {
  /* height: 100vh; */
  margin: 0;
  padding: 0;
}
.navbar-style {
  background-color: #05506b !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.navbar-style .navbar-nav .nav-item {
  margin-right: 10px;
}

.navbar-style .nav-link {
  color: #fff;
}

.navbar-style .active {
  color: #05506b;
}

.bootstrap-btn {
  background-color: #05506b;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.bootstrap-btn:hover {
  background-color: rgb(34, 72, 86);
}

.profile-img {
  margin-bottom: 3px;
  height: 1.5em; /* Ajusta la altura de la imagen al tamaño del texto */
  width: auto; /* Permite que el ancho de la imagen se ajuste proporcionalmente */
  margin-right: 0.5em; /* Agrega un margen derecho para separar la imagen del texto */
}
.nav-link{
  color: rgba(255, 255, 255, 1) !important;
}
.nav-link:hover{
  color: rgba(255, 255, 255, 0.5) !important;
}
.log-out {
  margin-left: 13px;
  margin-right: 20px;
  color: white;
  font-size: 23px;
  margin-bottom: 2px;
  cursor: pointer;
}
.log-out:hover {
  color: rgba(255, 255, 255, 0.5) !important;
}
.navbar-toggler {
  border:none;
  margin-left: 8px;
}
</style>
