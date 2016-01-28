var Game = function(name, dice, board){
  this.name = name;
  this.players = [];
  this.currentPlayerIndex = 0;
  this.dice = dice;
  this.board = board;
  this.winner = undefined;
  this.moves = 0;
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
    this.moves++;
    var player = this.currentPlayer();
    var roll = this.dice.roll();
    console.log(this.currentPlayer().name + ' rolls a ' + roll);
    var newPosition = this.newPosition(player, roll);
    if (this.validPosition(newPosition)) {
      newPosition = this.snakeOrLadderPosition(newPosition);
      this.movePlayer(player, newPosition);
      if (this.hasWon()) {
        this.setWinner();
        console.log(this.currentPlayer().name + ' ends on ' + this.currentPlayer().position);
        return;
      }
    }
    console.log(this.currentPlayer().name + ' ends on ' + this.currentPlayer().position);
    this.updateCurrentPlayerIndex();
  },



  
  snakeOrLadderPosition: function(position){
    if (this.hasSnake(position) || this.hasLadder(position)) {
      position = this.board.snakes[position] || this.board.ladders[position];
    }
    return position;
  },
  hasLadder: function(position){
    if (this.board.ladders[position]){
      console.log(this.currentPlayer().name + ' hits a ladder at square ' + position + '!');
      return true;
    }
    return false;
  },
  hasSnake: function(position){
    if (this.board.snakes[position]){
      console.log(this.currentPlayer().name + ' hits a snake at square ' + position + '!');
      return true;
    }
    return false;
  },
};

module.exports = Game;