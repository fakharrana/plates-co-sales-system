export const mockBasketRepository = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  increment: jest.fn(),
  sequelize: { query: jest.fn() },
};
