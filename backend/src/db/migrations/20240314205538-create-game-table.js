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
        type: Sequelize.ARRAY(Sequelize.TEXT), // Use ARRAY data type for PostgreSQL
        allowNull: false,
        defaultValue: [
          null, null, null, 
          null, null, null, 
          null, null, null
        ]
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
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.now
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Games');
  }
};
