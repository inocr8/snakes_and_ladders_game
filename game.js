var Game = function(name, dice){
  this.name = name;
  this.players = [];
  this.currentPlayerIndex = 0;
  this.dice = dice;
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
    if(this.currentPlayerIndex === this.players.length - 1) {
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex++;
    }
  },
};

module.exports = Game;