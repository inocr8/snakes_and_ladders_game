var assert = require('assert');

var Player = require('./player');
var Game = require('./game');

describe('Player', function(){
  it('should have a name', function(){
    var player = new Player('Euan');
    assert.equal('Euan', player.name); 
  });
});

describe('Game', function(){
  it('should have a name', function(){
    var game = new Game('First Game');
      assert.equal('First Game', game.name);
  });
});