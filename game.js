var Game = function(name){
  this.name = name;
  this.players = [];
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