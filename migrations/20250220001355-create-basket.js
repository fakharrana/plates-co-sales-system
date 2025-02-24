'use strict';
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('Baskets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      productCode: {
        type: sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'code',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Baskets');
  },
};
