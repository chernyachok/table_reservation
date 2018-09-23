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
      start_time: 'sept 24',
      end_time: 'sept25',
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


router.delete('/delete/:id', (req,res)=>{
  console.log('delete'+req.params.id)
  knex('reservations').delete().where('id', req.params.id)
  .then((data)=>{
    res.send('deleted'+data+' reservation');
  })

})

module.exports = router;
