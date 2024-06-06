import { DataTypes, InferAttributes, Model, Optional } from 'sequelize';
import db from '..';
import { Tag } from '~/types/tag';

class TagEntity extends Model<InferAttributes<TagEntity>, Optional<Tag, 'tagId'>> implements Tag {
  declare tagId: number;
  declare tagName: string;
  declare tagIcon: string;
  declare isDelete: string;
  declare createBy: string;
  declare updateBy: string;
}

TagEntity.init({
  tagId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  tagName: DataTypes.STRING,
  tagIcon: DataTypes.STRING,
  createBy: DataTypes.STRING,
  updateBy: DataTypes.STRING,
  isDelete: {
    type: DataTypes.STRING(1),
    defaultValue: '0'
  },
}, {
  sequelize: db.instance,
  tableName: 'tags',
  createdAt: 'createTime',
  updatedAt: 'updateTime',
})

TagEntity.sync({ alter: true })

export default TagEntity;


