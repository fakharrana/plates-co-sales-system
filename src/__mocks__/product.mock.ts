export const mockProductRepository = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  sequelize: { query: jest.fn() },
};

export const mockProductService = {
  getProductByCode: jest.fn(),
  getAllProduct: jest.fn(),
  addProduct: jest.fn(),
  clearProducts: jest.fn(),
};
