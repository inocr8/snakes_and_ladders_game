var Game = function(name, dice, board){
  this.name = name;
  this.players = [];
  this.currentPlayerIndex = 0;
  this.dice = dice;
  this.board = board;
  this.winner = undefined;
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
  // takeTurn: function(){
  //   var moves = this.dice.roll();
  //   var newPosition = this.currentPlayer().position + moves;
  //   this.movePlayer(this.currentPlayer(), newPosition);
  // },
  validRoll: function(player, roll){
    return player.position + roll <= this.board.squares;
  },
};

module.exports = Game;