<template>
<div class="login-container">
  <b-form>
  <span class="title-login"><img src="../assets/logo.png"></span>
  <b-form-group>
      <div class="input-group mb-3">
      <label class="label-login">Email</label>
      <span class="input-group-text" id="basic-addon1">📧</span>
      <b-form-input type="text" class="form-control" placeholder="your-email@gmail.com"></b-form-input>
      <label class="label-login">Password</label>
      <span class="input-group-text" id="basic-addon1">🔐</span>
      <b-form-input type="text" class="form-control" placeholder="Password"></b-form-input>
      </div>
      <b-button variant="outline-primary" type="submit" @click="$router.push('loginOwner')">Iniciar sesion</b-button>
    </b-form-group>
  </b-form>
</div>
</template>

<script>
</script>

<style>
.title-login{
  font-family: sans-serif;
}

</style>
