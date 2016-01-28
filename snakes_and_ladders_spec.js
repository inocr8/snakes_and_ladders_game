var assert = require('assert');

var Player = require('./player');
var Game = require('./game');
var Dice = require('./dice');
var Board = require('./board');

var ladders = {
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  51: 67,
  63: 81,
  71: 91
};

var snakes = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 78
};

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
    board = new Board(100, snakes, ladders);
    game = new Game('New Game', dice, board);
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
  it('should have a number of moves set to 0 at start of game', function(){
    assert.equal(0, game.moves);
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
    game.movePlayer(player, 4);
    assert.equal(4, player.position);
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
  it('should be able to check for a winner', function(){
    var player1 = new Player('Euan');
    game.addPlayer(player1);
    var player2 = new Player('Sky');
    game.addPlayer(player2);
    game.movePlayer(player1, 100);
    assert.equal(true, game.hasWon());
  });
  it('should be able to return a winner', function(){
    var player1 = new Player('Euan');
    game.addPlayer(player1);
    var player2 = new Player('Sky');
    game.addPlayer(player2);
    game.movePlayer(player1, 100);
    game.setWinner();
    assert.equal(player1, game.winner);
  });
  it('should check for a valid roll that doesn\'t go beyond end of board', function(){
    var player1 = new Player('Euan');
    game.addPlayer(player1);
    var roll = game.dice.roll();
    var newPosition = game.newPosition(game.currentPlayer(), roll);
    assert.equal(true, game.validPosition(newPosition));
  });
  it('should check for a roll will fail if it goes beyond end of board', function(){
    var player1 = new Player('Euan');
    game.addPlayer(player1);
    var roll = 150;
    var newPosition = game.newPosition(game.currentPlayer(), roll);
    assert.equal(false, game.validPosition(newPosition));
  });
  it('should be able to take a turn', function(){
    var player1 = new Player('Euan');
    game.addPlayer(player1);
    var player2 = new Player('Sky');
    game.addPlayer(player2);
    var player3 = new Player('Evelyn');
    game.addPlayer(player3);
    var player4 = new Player('Andy');
    game.addPlayer(player4);
    while (!game.winner) {
      console.log(game.currentPlayer().name + " starts on " + game.currentPlayer().position);
      game.takeTurn();
      console.log('\n');
    }
    console.log('Winner is ' + game.winner.name + '!\n');
    console.log(game);
  });
  it('should be able to check for ladder/snake', function(){
    var player1 = new Player('Euan');
    game.addPlayer(player1);
    var position = 4;
    assert.equal(true, game.hasLadder(position));
    var position = 17;
    assert.equal(true, game.hasSnake(position));
  });
  it('should be able to check for ladder/snake, fail', function(){
    var player1 = new Player('Euan');
    game.addPlayer(player1);
    var position = 5;
    assert.equal(false, game.hasLadder(position));
    var position = 18;
    assert.equal(false, game.hasSnake(position));
  });
  it('should return snake or ladder exit position', function(){
    var player1 = new Player('Euan');
    game.addPlayer(player1);
    var position = 4;
    var exitPosition = game.snakeOrLadderPosition(position);
    assert.equal(14, exitPosition);
    var position = 17;
    var exitPosition = game.snakeOrLadderPosition(position);
    assert.equal(7, exitPosition);
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

describe('Board', function(){
  it('should have squares of a passed amount', function(){
    var board = new Board(100);
    assert.equal(100, board.squares);
  });
});