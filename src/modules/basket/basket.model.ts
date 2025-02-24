import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';
import { Product } from 'src/modules/product/product.model';

@Table({ tableName: 'Baskets', timestamps: true })
export class Basket extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Product)
  @Column({ allowNull: false })
  productCode: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @BelongsTo(() => Product, { foreignKey: 'productCode', targetKey: 'code' })
  product: Product;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
