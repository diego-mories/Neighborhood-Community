<template>
    <div class="screen">
        <div class="row" id="grid-top-log">
          <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
          <NavBarOwner v-if="role === 3" id="full"></NavBarOwner>
        </div>
        <div class="row" id="grid-top">
            <div class="row" id="topR">
            <div class="col-sm-1" id="full">
                <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/login')">VOLVER</button>
            </div>
            <div class="col-sm-11" id="full">
                <span class="title"><b>Mis Pagos</b></span>
            </div>
            </div>
            <div class="row" id="bottomR">
                <div class="col-sm-1" id="full">
                </div>
                <div class="col-sm-11" id="full">
                    <div class="container">
                        <b-table
                          class="m-5 "
                          style="overflow-y:auto; height: 60vh !important;"
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
                        <b-button @click="downloadPDFWithjsPDF()">IMPRIMIR PAGOS</b-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="grid-bottom-home">
            <Footer id="full"></Footer>
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
      { key: 'type_bill', label: 'Tipo de gasto' },
      { key: 'description', label: 'Descripción' },
      { key: 'd_payment', label: 'Fecha de pago' },
      { key: 'd_deb', label: 'Fecha de deuda' }
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
