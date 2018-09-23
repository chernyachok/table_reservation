var router = require('express').Router();
var config = require('../knexfile')[process.env.DB_DEV];
const knex = require('knex')(config);

router.get('/', (req,res)=>{
  knex('tables').then((data)=>{
    knex('reservations').then((reserved)=>{
      res.render('tables', {data: data, reserved: reserved});
    })

  })
})
module.exports = router;
