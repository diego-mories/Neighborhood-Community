<template>
  <div class="screen">
    <div class="row" id="grid-top-log">
      <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
    </div>
    <div class="row" id="grid-top">
      <div class="row" id="topR">
        <div class="col-sm-1" id="full">
          <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('login')">Volver</button>
        </div>
        <div class="col-sm-11" id="full">
          <span class="title"><b>Crear Aviso</b></span>
        </div>
      </div>
      <div class="row" id="bottomR">
        <div class="col-1" id="full">
        </div>
        <div class="col-3 m-auto" id="full">
          <span><img class="w-50 h-50 mw-50 mh-50 mb-5" src="../assets/images/18-Tablon-de-Anuncios.png"></span>
          <div class="input-group mb-3 d-flex justify-content-center">
            <b-form-group>
                <div class="input-group">
                    <label class="label-login">Ordem del día</label>
                    <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
                    <b-form-input type="text" class="form-control" placeholder="Orden del día" v-model="orderDay"></b-form-input>
                    <label class="label-login">Fecha</label>
                    <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-calendar"/></span>
                    <b-form-input type="date" class="form-control" v-model="date"></b-form-input>
                </div>
            </b-form-group>
          </div>
          <div class="input-group mb-3 d-flex justify-content-center">
            <b-form-group>
                <b-button class="m-3" variant="outline-primary" type="submit">Enviar acta por correo eletrínco a vecinos</b-button>
                <b-button class="m-3" variant="outline-primary" type="submit" @click="printDiv()">Imprimir acta</b-button>
            </b-form-group>
          </div>
        </div>
      </div>
    </div>
    <div class="row" id="grid-bottom">
      <footer-social-network></footer-social-network>
    </div>
  </div>
</template>

<script>
import FooterSocialNetwork from '../components/FooterSocialNetwork.vue'
import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
export default {
  components: {
    FooterSocialNetwork,
    NavBarPresident,
    NavBarOwner
  },
  created () {
    this.dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.role = this.dataUserLogin.role_id
  },
  data () {
    return {
      role: null,
      date: null,
      orderDay: null,
      dataUserLogin: {}
    }
  },
  methods: {
    printDiv () {
      const text = '<p><em>COMUNIDAD DE PROPIETARIOS DE VIVIENDAS</em></p><br><p style="text-align:center"><strong>CONVOCATORIA A JUNTA GENERAL ORDINARIA </strong></p><br>'
      const text2 = '<p>Estimados Señores:</p><br><p> De conformidad con lo dispuesto en la Ley de Propiedad Horizontal, me permito convocarle a la Junta General Ordinaria de esta comunidad, quetendrá lugar el próximo día <span class="Blank Short">  ' + this.date + '</span> , con arreglo al siguiente:</p>'
      const text3 = '<p style="text-align:center">ORDEN DEL DÍA</p><p>- ' + this.orderDay + '</p>'
      const text4 = '<p style="text-align:center">Fdo. <br></p><p style="text-align:center"> ' + this.dataUserLogin.name + ' ' + this.dataUserLogin.surname + '   </p><br><br><br><br>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -<br><br>'
      var a = window.open('', '', 'height=1000, width=1000')
      a.document.write('<html>')
      a.document.write(text)
      a.document.write(text2)
      a.document.write(text3)
      a.document.write(text4)
      a.document.write('</body></html>')
      a.document.close()
      a.print()
    }
  }
}
</script>

<style>
</style>
