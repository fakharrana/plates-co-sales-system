'use strict';
module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.createTable('Offers', {
      id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      productCode: {
        type: sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: sequelize.STRING,
        allowNull: false,
      },
      discountPercentage: {
        type: sequelize.FLOAT,
        allowNull: false,
      },
      minQuantity: {
        type: sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: sequelize.TEXT,
        allowNull: true,
      },
      isActive: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
      },
      updatedAt: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Offers');
  },
};
