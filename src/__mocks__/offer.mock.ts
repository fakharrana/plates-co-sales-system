export const mockOfferRepository = {
  findAll: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  sequelize: {
    query: jest.fn(),
  },
};

export const mockOfferService = {
  applyOffers: jest.fn(),
  getAllOffers: jest.fn(),
  addOffer: jest.fn(),
  clearOffers: jest.fn(),
};
