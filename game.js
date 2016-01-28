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
};

module.exports = Game;