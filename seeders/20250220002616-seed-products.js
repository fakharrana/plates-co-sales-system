module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      {
        code: 'R01',
        name: 'Red Plate',
        price: 32.95,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'G01',
        name: 'Green Plate',
        price: 24.95,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'B01',
        name: 'Blue Plate',
        price: 7.95,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
