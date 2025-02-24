module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      code: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: sequelize.STRING,
      },
      price: {
        type: sequelize.FLOAT,
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
    await queryInterface.dropTable('Products');
  },
};
