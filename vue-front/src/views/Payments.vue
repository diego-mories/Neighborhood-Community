<template>
  <div class="container-fluid bg-svg d-flex flex-column" style="min-height:1329px">
    <div class="row">
      <NavBarPresident v-if="role === 1"></NavBarPresident>
      <NavBarOwner v-if="role === 3"></NavBarOwner>
    </div>
    <div class="row" style="margin-top: 120px;">
      <b-col>
        <router-link to="/login">
          <div class="back">
            <span class="d-none d-lg-block">VOLVER</span>
            <font-awesome-icon icon="fa-solid fa-tent-arrow-turn-left" style="font-size: 30px; "></font-awesome-icon> 
          </div>
        </router-link>
      </b-col>
    </div>
    <div class="row">
      <b-col>
        <span class="title"><b>MIS PAGOS</b></span>
      </b-col>
    </div>
    <div class="row flex-grow-1" style="margin-top:123px" v-if="role === 1">
      <div class="col-lg-8 col-11 mr-auto ml-auto  mr-auto ml-auto">
        <div class="table-container ">
            <b-table
              style="overflow:auto; max-height: 615px;"
              ref="payTable"
              id="payTable"
              :fields="headers"
              :items="payments"
              responsive="sm"
            >
              <template #cell(d_bill)="data">
                {{ data.item.d_bill | formatDate}}
              </template>
              <template #cell(d_payment)="data">
                {{ data.item.d_payment | formatDateP}}
              </template>
              <template #cell(description)="data">
                {{ data.item.description | formatDescription}}
              </template>
              <template #cell(amount)="data">
                {{ data.item.amount | formatAmount}}
                </template>
              <template #cell(type_bill)="data">
                {{ data.item.type_bill | formatBillP}}
              </template>
            </b-table>
            <b-button class="m-1 custom-button" variant="outline-primary" type="submit" @click.prevent="downloadPDFWithjsPDF()">IMPRIMIR PAGOS</b-button>
        </div>
      </div>
    </div>
    <div class="row">
      <b-col>
        <Footer></Footer>
      </b-col>
    </div>
  </div>
</template>
<script>

import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
import Footer from '../components/FooterSocialNetwork.vue'
import BillsSpillsServices from '../services/Bills_Spills'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default {
  data: () => ({
    role: null,
    fd_id: null,
    dataUserLogin: {},
    payments: [],
    headers: [
      { key: 'amount', label: 'Cantidad', tdClass: 'table-title', thClass: 'table-title' },
      { key: 'type_bill', label: 'Tipo' },
      { key: 'description', label: 'Descripción' },
      { key: 'd_payment', label: 'Fecha pago' },
      { key: 'd_deb', label: 'Fecha deuda' }
    ]
  }),
  components: {
    NavBarPresident,
    NavBarOwner,
    Footer
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
      this.role = this.dataUserLogin.role_id
      const array = await BillsSpillsServices.findAllDebsAllIds(this.dataUserLogin)
      const records = array.data.dataResponse
      for (let id of records) {
        BillsSpillsServices.findPayment(id).then(
          Response => {
            this.payments.push(Response.data[0])
		console.log(this.payments)
          },
          Error => {
            console.log('Error al buscar datos de deudas' + Error)
          }
        )
      }
    },
    downloadPDFWithjsPDF () {
      const fecha = new Date()
      const doc = new jsPDF()
      const $ = require('jquery')
      window.$ = $
      autoTable(doc, { html: '#payTable' })
      doc.save('Pagos-' + fecha.toLocaleDateString() + '.pdf')
    }
  }
}

</script>
<style >
.table-container table thead {
  position: sticky;
  top: 0;
  background-color: #05506b !important;
  z-index: 1;
}
@media (max-width: 768px) { 
  .table-container {
    font-size: 12px;
  }
}
</style>
