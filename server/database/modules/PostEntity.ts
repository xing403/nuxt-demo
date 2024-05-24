
import { DataTypes, InferAttributes, Model } from 'sequelize';
import db from '..';

class PostEntity extends Model<InferAttributes<PostEntity>> {
  declare postId: number;
  declare postTitle: string;
  declare postContent: string;
  declare postTags: string;
  declare isDelete: string;
  declare createBy: string;
  declare updateBy: string;
}

PostEntity.init({
  postId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  postTitle: DataTypes.STRING,
  postContent: DataTypes.TEXT,
  postTags: DataTypes.STRING,
  isDelete: {
    type: DataTypes.STRING(1),
    defaultValue: '0'
  },
  createBy: DataTypes.STRING,
  updateBy: DataTypes.STRING
}, {
  sequelize: db.instance,
  tableName: 'posts',
  createdAt: 'createTime',
  updatedAt: 'updateTime',
})

PostEntity.sync({ alter: true })

export default PostEntity;


