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
  beforeEach(function createGame(){
    game = new Game('New Game');
  })

  it('should have a name', function(){
      assert.equal('New Game', game.name);
  });
  it('should confirm the game array is empty at game start', function(){
    assert.deepEqual([], game.players);
  });
  it('should be able to add player to the game array', function(){
    var player = new Player('Euan');
    game.addPlayer(player);
    assert.equal('Euan', game.players[0].name);
  });
  it('should be able to move a player to a position', function(){
    var player = new Player('Euan');
    game.addPlayer(player);
    movePlayer(player, 3);
    assert.equal(player.position = position);
  });
});

describe('Dice', function(){
  it('should have sides', function(){
    var dice = new Dice(6);
    assert.equal(6, dice.sides);
  });
  it('should be able to roll a number', function(){
    var dice = new Dice(6);
    var num = dice.roll();
    assert.equal('number', typeof num);
  })
});