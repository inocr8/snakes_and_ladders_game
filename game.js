var Game = function(name, dice, board, snakes, ladders){
  this.name = name;
  this.players = [];
  this.currentPlayerIndex = 0;
  this.dice = dice;
  this.board = board;
  this.winner = undefined;
  this.ladders = ladders;
  this.snakes = snakes;
};

Game.prototype = {
  addPlayer: function(player){
    this.players.push(player);
  },
  currentPlayer: function(){
    return this.players[this.currentPlayerIndex];
  },
  movePlayer: function(player, position){
    player.position = position;
  },
  updateCurrentPlayerIndex: function(){
    if(this.currentPlayerIndex === this.players.length - 1){
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex++;
    }
  },
  hasWon: function(){
    return this.currentPlayer().position === this.board.squares;
  },
  setWinner: function(){
    if(this.hasWon()){
      this.winner = this.currentPlayer();
    }
  },
  newPosition: function(player, roll){
    return player.position + roll;
  },
  validPosition: function(position){
    return position <= this.board.squares;
  },
  takeTurn: function(){
    var player = this.currentPlayer();
    var roll = this.dice.roll();
    var newPosition = this.newPosition(player, roll);
    if (this.validPosition(newPosition)) {
      newPosition = this.snakeOrLadderPosition(newPosition);
      this.movePlayer(player, newPosition);
      if (this.hasWon()) {
        this.setWinner();
        return;
      }
    }
    this.updateCurrentPlayerIndex();
  },
  snakeOrLadderPosition: function(position){
    if (this.hasSnake(position) || this.hasLadder(position)) {
      position = this.snakes[position] || this.ladders[position];
    }
    return position;
  },
  hasLadder: function(position){
    if (this.ladders[position]){
      return true;
    }
    return false;
  },
  hasSnake: function(position){
    if (this.snakes[position]){
      return true;
    }
    return false;
  },
};

module.exports = Game;