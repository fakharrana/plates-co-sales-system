import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  Unique,
} from 'sequelize-typescript';

@Table({ tableName: 'Products', timestamps: true })
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  code: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
