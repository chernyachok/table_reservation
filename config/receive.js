const amqp = require('amqplib/callback_api');
var config = require('../knexfile')[process.env.DB_DEV];
const knex = require('knex')(config);
//var connection = amqp.createConnection({ host: 'amqp://localhost' });

 amqp.connect('amqp://localhost', (err,conn)=>{
    conn.createChannel(function(err, ch) {

    const eventKey= 'keyboardcat';
    ch.assertQueue(eventKey, { durable: true });
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.consume(eventKey, function(msg) {
         console.log(" Received %s", msg.content.toString());
         var row = JSON.parse(msg.content.toString());
      //   console.log(row.table_id)
///////
          knex('reservations').where('table_id',row.table_id).then((data)=>{
            //console.log(row);
            if(data.length !=0){
              console.log('table already booked!')
              //console.log(req.body);
              return false
            }
              knex('tables').where('id', row.table_id)
                .then((data1)=>{
                  var guest_num = parseInt(row.guests);
                  if(guest_num > data1[0].capacity){
                    console.log('too many guests')
                    return false;
                  }
                  knex('reservations').insert({
                    table_id: row.table_id,
                    start_time: row.start_time,
                    end_time: row.reservation_duration,
                    guests: row.guests
                  })
                  .then(()=>{
                  console.log('Reserved successfully')//return event success
                  })
                  .catch((err)=>{
                    console.log(err);
                  })
                })
          })

/////
          }, { noAck: true });

  });
})
