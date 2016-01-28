var assert = require('assert');

var Player = require('./player');
var Game = require('./game');
var Dice = require('./dice');

describe('Player', function(){
  it('should have a name', function(){
    var player = new Player('Euan');
    assert.equal('Euan', player.name); 
  });
  it('should have inital position of 0', function(){
    var player = new Player('Euan');
    assert.equal(0, player.position);
  });
});

describe('Game', function(){
  it('should have a name', function(){
    var game = new Game('First Game');
      assert.equal('First Game', game.name);
  });
});

describe('Dice', function(){
  it('should have sides', function(){
    var dice = new Dice(6);
    assert.equal(6, dice.sides);
  });
});