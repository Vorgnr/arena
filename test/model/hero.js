var assert = require("assert");
var should = require("should");
var Hero = require('./../../server/model/hero');

var hero;

describe('Hero', function(){
  beforeEach(function(){
    hero = new Hero(0, 0);
  })
  describe('#moveDown()', function(){
    it('should set property isMovingDown to true', function(done){
      hero.moveDown();
      hero.should.have.property('isMovingDown', true);
      done();
    })
  })
})