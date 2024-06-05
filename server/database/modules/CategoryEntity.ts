import { DataTypes, InferAttributes, Model, Optional } from 'sequelize';
import db from '..';
import { Category } from '~/types/category';

class CategoryEntity extends Model<InferAttributes<CategoryEntity>, Optional<Category, 'categoryId'>> implements Category {
  declare categoryId: number;
  declare categoryName: string;
  declare categoryDesc: string;
  declare categoryIcon: string;
  declare isDelete: string;
  declare createBy: string;
  declare updateBy: string;
}

CategoryEntity.init({
  categoryId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryName: DataTypes.STRING,
  categoryDesc: DataTypes.STRING,
  categoryIcon: DataTypes.STRING,
  createBy: DataTypes.STRING,
  updateBy: DataTypes.STRING,
  isDelete: {
    type: DataTypes.STRING(1),
    defaultValue: '0'
  },
}, {
  sequelize: db.instance,
  tableName: 'categories',
  createdAt: 'createTime',
  updatedAt: 'updateTime',
})

CategoryEntity.sync({ alter: true })

export default CategoryEntity;


