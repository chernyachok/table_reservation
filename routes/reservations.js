var router = require('express').Router();
var config = require('../knexfile')[process.env.DB_DEV];
const knex = require('knex')(config);
//const send = require('../config/sendsocket.js')
//const receive = require('../config/receivesocket.js')



router.get('/', (req,res)=>{
  knex('reservations').then((data)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json(data)
    //res.render('reservations', {data: data});
  })
})

const send = require('../config/send');
require('../config/receive')
router.post('/',(req,res)=>{
  var createReserve = {
        table_id: req.body.table_id,
        guests: req.body.guests,
        user_email: "john.doe@gmail.com",//req.user_email
        start_time: req.body.start_time,///////////"2018-09-28 21:00:00"
        reservation_duration: req.body.reservation_duration
  }
//  console.log(createReserve)
  send(createReserve)
})



router.get('/new/:id', (req,res)=>{
  res.render('new', {data: req.params.id})
})

router.get('/update/:id', (req,res)=>{
  knex('reservations').where('id', req.params.id).then((data)=>{
    //console.log(data);
      res.render('edit', {data: data[0]});
  })

})


router.delete('/delete/:id', (req,res)=>{
  console.log('delete'+req.params.id)
  knex('reservations').delete().where('id', req.params.id)
  .then((data)=>{
    res.status(202).json({msg : "deleted reservation"});
  })

})

router.put('/update',(req,res)=>{///// change to .put if you are using curl in console
  console.log(req.body)
  knex('reservations').update({
    guests: req.body.guests,
    start_time: req.body.start_time,
    end_time: req.body.end_time
  }).where('id', req.body.current_id).then(()=>{
    //res.redirect('/reservations');
    res.status(201).json({msg: "updated successfully"})
  })

})

module.exports = router;
