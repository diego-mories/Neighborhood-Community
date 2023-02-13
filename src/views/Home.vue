<template>
    <div class="row">
        <div class="col-md-4" id="loginColL">
            <ColumnaImg></ColumnaImg>
        </div>
        <div class="col" id="loginColR">
            <login-form></login-form>
        </div>
    </div>
  </template>

<script>
import LoginForm from '../components/LoginForm.vue'
import ColumnaImg from '../components/ColumnaImg.vue'
export default {
  components: {
    LoginForm,
    ColumnaImg
  }
}
</script>

<style>

</style>
