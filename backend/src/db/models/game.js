module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    winner: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: null
    },
    position: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
      defaultValue: [
        null, null, null, 
        null, null, null, 
        null, null, null
      ]
    },
    turn: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'X'
    }
  });

  return Game;
};
