const assert = require('chai').assert;
const kx = require('../knexfile.js').development.connection


describe('App', ()=>{
  beforeEach(function(){
    console.log('starting to test..')
  })
  it('Host checking', ()=>{
    assert.equal(kx.host, 'localhost')
  })
  it('user checking', ()=>{
    assert.typeOf(kx.user, 'string')
  })
  it('password checking', ()=>{
    assert.isAbove(kx.password, 111)
  })
  it('database checking', ()=>{
    assert.strictEqual(kx.database, 'restaurant')
  })

})
