var Game = function(name, dice){
  this.name = name;
  this.players = [];
  this.dice = dice;
};

Game.prototype = {
  addPlayer: function(player){
    this.players.push(player);
  },
};

module.exports = Game;