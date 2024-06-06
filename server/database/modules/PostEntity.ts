
import { DataTypes, InferAttributes, Model } from 'sequelize';
import db from '..';

class PostEntity extends Model<InferAttributes<PostEntity>> {
  declare postId: number;
  declare postTitle: string;
  declare postContent: string;
  declare postTags: string;
  declare postViewer: number;
  declare postComment: number;
  declare postCollect: number;
  declare postCategory: number;
  declare postStar: number;
  declare postCover: string;
  declare postIsTop: string;
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
  postViewer: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  postComment: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  postCollect: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  postCategory: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  postStar: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  postCover: DataTypes.STRING,
  postIsTop: {
    type: DataTypes.STRING(1),
    defaultValue: '0'
  },
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


