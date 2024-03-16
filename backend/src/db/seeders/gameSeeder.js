
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Games', [{
      winner: null,
      position: JSON.stringify({
        "00": null, "01": null, "02": null,
        "10": null, "11": null, "12": null,
        "20": null, "21": null, "22": null
      }),
      turn: 'X',
      createdAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Games', null, {});
  }
};
