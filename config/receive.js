const amqp = require('amqplib/callback_api');
var config = require('../knexfile')[process.env.DB_DEV];
const knex = require('knex')(config);
//var connection = amqp.createConnection({ host: 'amqp://localhost' });

 amqp.connect('amqp://localhost', (err,conn)=>{
    conn.createChannel(function(err, ch) {


    const eventKey= 'keyboardcat';
    const eventKey2 = 'notifications'
    ch.assertQueue(eventKey, { durable: true });
    ch.assertQueue(eventKey2, {durable:true});
    ch.consume(eventKey, function(msg) {
         //console.log(" Received %s", msg.content.toString());
         var row = JSON.parse(msg.content.toString());
      //   console.log(row.table_id)
///////
          var success = {
            user_email: row.user_email,
            status: "Reservation is successfull"
          }
          var fail = {
            user_email: row.user_email,
            status: "Reservation is not successfull"
          }
          knex('reservations').where('table_id',row.table_id).then((data)=>{
            if(data.length !=0){
              console.log('table already booked!')
              ch.sendToQueue(eventKey2, new Buffer(JSON.stringify(fail)),{ persistent: true })
              //console.log(req.body);
              return false
            }
              knex('tables').where('id', row.table_id)
                .then((data1)=>{
                  var guest_num = parseInt(row.guests);
                  if(guest_num > data1[0].capacity){
                    ch.sendToQueue(eventKey2, new Buffer(JSON.stringify(fail)),{ persistent: true })
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
                    ch.sendToQueue(eventKey2, new Buffer(JSON.stringify(success)),{ persistent: true })//notification queue
                  //console.log('Reserved successfully')//return event success
                  })
                  .catch((err)=>{
                    console.log(err);
                  })
                })
          })

/////
          }, { noAck: true });
          ch.consume(eventKey2, (msg2)=>{
            console.log(" Received %s", msg2.content.toString());
          },{ noAck: true })
  });
})
