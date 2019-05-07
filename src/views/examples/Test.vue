
<template>
  <div class="about container">
    <h3>This is the test page</h3>

    <input placeholder="ชื่อ" v-model='name'>

    <div>{{ name }}</div>
  </div>
</template>

<script>
import Parse from 'parse'
export default {
  data() {
    return {
      name: '...'
    }
  },
  created() {
    this.name = '555666665'

    // this.testReservationReq()
  },
  methods: {
    hello() {
      alert('Hello!')
    },

    async testReservationReq() {
      var req = {}
      var query = new Parse.Query('ReservationReq')
      req.object = await query.first()
      console.log(req.object)
      this.reqAfterSave(req)
    },
    reqAfterSave(req) {
      // customer
      var customer = req.object.get('customer')

      // amount
      var amount = req.object.get('amount')
      var remaining = amount
      
      // Dates for querying
      var date = req.object.get('date')
      var dateStart = new Date(date)
      dateStart.setHours(0,0,0,0)
      console.log('dateStart: ' + dateStart)
      var dateEnd = new Date(date)
      dateEnd.setHours(23,59,59,999)
      console.log('dateEnd: ' + dateEnd)

      // new Parse.Query('Reservation')
      // .lessThanOrEqualTo('date', dateEnd)
      // .greaterThanOrEqualTo('date', dateStart)
      // .select("customer")
      // .first()
      // .then(
      //   (r) => {
      //     console.log(r)
      //   }
      // )
      var reservQuery = new Parse.Query('Reservation')
      .lessThanOrEqualTo('date', dateEnd)
      .greaterThanOrEqualTo('date', dateStart)
      // .select("customer", 'date')

      reservQuery.find().then(
        (results) => {
          var reservedTableIds = []
          for (var i = 0; i < results.length; i++) {
            // console.log(results[i].get('Table').id)

            reservedTableIds.push(results[i].get('Table').id)
          }
          console.log(reservedTableIds)

          // Table
          var tableQuery = new Parse.Query('Tableja')
          // .matchesKeyInQuery('objectIds', 'Tableja.objectId', reservQuery)

          tableQuery.find({useMasterKey: true}).then(
            (tables) => {
              // console.log(tables)
              for (var i = 0; i < tables.length; i++) {

                if (remaining <= 0) {
                  break;
                }

                var t = tables[i]

                // if table is available
                if (reservedTableIds.includes(t.id) === false) {
                  var tableNo = tables[i].get('TableNumber')

                  // make reservation on the table
                  var newReserv = new Parse.Object('Reservation')
                  newReserv.set('customer', customer)
                  newReserv.set('Table', t)
                  newReserv.set('date', date)
                  newReserv.set('request', req.object)
                  newReserv.save()
                  // .then(
                  //   () => {
                  //     // save Table relation
                  //     t.relation('Reservations').add(newReserv)
                  //     t.save()
                  //   }
                  // )

                  remaining -= t.get('Seat')    // reduce the remaining amount
                  console.log('reserved table ' + tableNo + ', ' + remaining + ' remaining')
                }
              }
            }
          )


        }
      )

      // var tableQuery = new Parse.Query('Tableja')
      // .matchesKeyInQuery('objectIds', 'Tableja.objectId', reservQuery)

      // tableQuery.find({useMasterKey: true}).then(
      //   (tables) => {
      //     console.log(tables)
      //     for (var i = 0; i < tables.length; i++) {
      //       console.log(tables[i].id)
      //     }
      //   }
      // )
    }
  }
}
</script>
