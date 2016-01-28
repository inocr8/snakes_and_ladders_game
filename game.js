var Game = function(name){
  this.name = name;
  this.players = [];
};

Game.prototype = {
  addPlayer: function(player){
    this.players.push(player);
  },
};

module.exports = Game;