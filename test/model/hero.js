var assert = require("assert");
var should = require("should");
var Hero = require('./../../server/model/hero');

var hero;

describe('Hero', function(){
  beforeEach(function(){
    hero = new Hero(0, 0);
  });
  
  describe('#resetMovementState()', function() {
    beforeEach(function(){
      hero.isMovingUp = true;
      hero.isMovingDown = true;
      hero.isMovingLeft = true;
      hero.isMovingRight = true;
      hero.isMovingStateChanged = true;
      hero.resetMovementState();
    });
    
    it("should set isMovingUp property to false", function() {
      hero.should.have.property('isMovingUp', false);
    });
    
    it("should set isMovingDown property to false", function() {
      hero.should.have.property('isMovingDown', false);
    });
    
    it("should set isMovingLeft property to false", function() {
      hero.should.have.property('isMovingLeft', false);
    });
    
    it("should set isMovingRight property to false", function() {
      hero.should.have.property('isMovingRight', false);
    });
    
    it("should set isMovingStateChanged property to false", function() {
      hero.should.have.property('isMovingStateChanged', false);
    });
  });
  
  describe('#moveDown()', function(){
    var yBeforeMoving;
    
    beforeEach(function(){
      yBeforeMoving = hero.y;
      hero.moveDown();
    });
    
    it('should set isMovingDown property to true', function(){
      hero.should.have.property('isMovingDown', true);
    });
    
    it("should increase hero.y by hero.speed", function(){
      hero.y.should.equal(yBeforeMoving + hero.speed);
    });
  });
  
  describe('#moveUp()', function(){
    var yBeforeMoving;
    
    beforeEach(function(){
      yBeforeMoving = hero.y;
      hero.moveUp();
    });
    
    it('should set isMovingUp property to true', function(){
      hero.should.have.property('isMovingUp', true);
    });
    
    it("should decrease hero.y by hero.speed", function(){
      hero.y.should.equal(yBeforeMoving - hero.speed);
    });
  });
  
  describe('#moveLeft()', function(){
    var xBeforeMoving;
    
    beforeEach(function(){
      xBeforeMoving = hero.x;
      hero.moveLeft();
    });
    
    it('should set isMovingLeft property to true', function(){
      hero.should.have.property('isMovingLeft', true);
    });
    
    it("should decrease hero.x by hero.speed", function(){
      hero.x.should.equal(xBeforeMoving - hero.speed);
    });
  });
  
  describe('#moveRight()', function(){
    var xBeforeMoving;
    
    beforeEach(function(){
      xBeforeMoving = hero.x;
      hero.moveRight();
    });
    
    it('should set isMovingRight property to true', function(){
      hero.should.have.property('isMovingRight', true);
    });
    
    it("should increase hero.x by hero.speed", function(){
      hero.x.should.equal(xBeforeMoving + hero.speed);
    });
  });
});