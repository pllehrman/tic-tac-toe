'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Games', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      winner: {
        type: Sequelize.STRING(1),
        allowNull: true,
        defaultValue: null
      },
      position: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          "00": null, "01": null, "02": null,
          "10": null, "11": null, "12": null,
          "20": null, "21": null, "22": null
        }
      },
      turn: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: 'X'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Games');
  }
};
