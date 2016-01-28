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
    dice = new Dice(6);
    game = new Game('New Game', dice);
  })

  it('should have a name', function(){
      assert.equal('New Game', game.name);
  });
  it('should confirm the game array is empty at game start', function(){
    assert.deepEqual([], game.players);
  });
  it('should have a dice when the game is created', function(){
    assert.equal(dice, game.dice);
  });
  it('should be able to add player to the game array', function(){
    var player = new Player('Euan');
    game.addPlayer(player);
    assert.equal('Euan', game.players[0].name);
  });
  it('should have current player index of 0', function(){
    assert.equal(0, game.currentPlayerIndex);
  });
  it('should have current player', function(){
    var player1 = new Player('Euan');
    game.addPlayer(player1);
    var player2 = new Player('Sky');
    game.addPlayer(player2);
    assert.equal(player1, game.currentPlayer());
  });
  it('should be able to move a player to a position', function(){
    var player = new Player('Euan');
    game.addPlayer(player);
    game.movePlayer(player, 3);
    assert.equal(3, player.position);
  });
  it('should be able to update the current player to the next player', function(){
    var player1 = new Player('Euan');
    game.addPlayer(player1);
    var player2 = new Player('Sky');
    game.addPlayer(player2);
    game.updateCurrentPlayerIndex();
    assert.equal(1, game.currentPlayerIndex);
    assert.equal(player2, game.currentPlayer());
  });
  it('should be able to go back to the start of the player array', function(){
    var player1 = new Player('Euan');
    game.addPlayer(player1);
    var player2 = new Player('Sky');
    game.addPlayer(player2);
    game.updateCurrentPlayerIndex();
    game.updateCurrentPlayerIndex();
    assert.equal(0, game.currentPlayerIndex);
    assert.equal(player1, game.currentPlayer());
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
  });
});