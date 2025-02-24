import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Offer extends Model<Offer> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  productCode: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  discountPercentage: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  minQuantity: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
