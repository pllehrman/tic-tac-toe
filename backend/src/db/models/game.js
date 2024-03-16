// models/game.js
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    winner: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: null
    },
    position: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        "00": null, "01": null, "02": null,
        "10": null, "11": null, "12": null,
        "20": null, "21": null, "22": null
      }
    },
    turn: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'X'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return Game;
};
