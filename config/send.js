const amqp = require('amqplib/callback_api');
var exchangeName = 'ex1'
var send = msg=>{
  amqp.connect('amqp://localhost', (err,conn)=>{
      conn.createChannel(function(err, ch) {

      const eventKey = 'keyboardcat';
      ch.assertQueue(eventKey, { durable: true });

      ch.sendToQueue(eventKey,//reservation queue
       new Buffer(JSON.stringify(msg)),
       { persistent: true }
      );
      console.log(" msg sent");

    });
  })

}



module.exports = send
