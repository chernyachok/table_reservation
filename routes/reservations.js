var router = require('express').Router();
var config = require('../knexfile')[process.env.DB_DEV];
const knex = require('knex')(config);

router.get('/', (req,res)=>{
  knex('reservations').then((data)=>{
    res.render('reservations', {data: data});
  })
})
router.post('/', (req,res)=>{
  knex('reservations').where('table_id', req.body.table_id).then((data)=>{
    if(data.length !=0){
      console.log('table alredy booked!')
      console.log(req.body);
      return res.redirect('/tables')
    }
    knex('reservations').insert({
      table_id: req.body.table_id,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      guests: req.body.guests
    })
    .then(()=>{
      res.redirect('/reservations');
    })
    .catch((err)=>{
      console.log(err);
    })


  })
  //console.log(req.body)
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
    res.send('deleted'+data+' reservation');
  })

})

router.post('/update',(req,res)=>{//////////updating
  console.log(req.body)
  knex('reservations').update({
    guests: req.body.guests,
    start_time: req.body.start_time,
    end_time: req.body.end_time
  }).where('id', req.body.current_id).then(()=>{
    res.redirect('/reservations');

  })

})

module.exports = router;
