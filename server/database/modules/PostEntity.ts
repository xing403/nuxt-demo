
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
  isDelete: DataTypes.STRING(1),
  createBy: DataTypes.STRING,
  updateBy: DataTypes.STRING
}, {
  sequelize: db.instance,
  tableName: 'posts',
  createdAt: 'createTime',
  updatedAt: 'updateTime',
})

export default PostEntity;


