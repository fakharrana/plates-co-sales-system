module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Offers', [
      {
        productCode: 'R01',
        type: 'BOGO',
        discountPercentage: 50,
        minQuantity: 2,
        description: 'Buy One Red Plate, Get Second Half Price',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Offers', null, {});
  },
};
