var Game = function(name, dice){
  this.name = name;
  this.players = [];
  this.dice = dice;
};

Game.prototype = {
  addPlayer: function(player){
    this.players.push(player);
  },
  movePlayer: function(player, position){
    player.position = position;
  },
};

module.exports = Game;