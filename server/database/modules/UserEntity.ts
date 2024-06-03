import { DataTypes, InferAttributes, Model, Optional } from 'sequelize';
import db from '..';
import { User } from '~/types/user';

class UserEntity extends Model<InferAttributes<UserEntity>, Optional<User, 'userId'>> implements User {
  declare userId: number;
  declare username: string;
  declare password: string;
  declare avatar: string;
  declare auth: string;
  declare ip: string;
  declare loginTime: string;
  declare email: string;
  declare isDelete: string;
}

UserEntity.init({
  userId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  avatar: DataTypes.STRING,
  auth: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  },
  ip: DataTypes.STRING,
  loginTime: DataTypes.DATE,
  email: DataTypes.STRING,
  isDelete: {
    type: DataTypes.STRING(1),
    defaultValue: '0'
  },
}, {
  sequelize: db.instance,
  tableName: 'users',
  createdAt: 'createTime',
  updatedAt: 'updateTime',
})

UserEntity.sync({ alter: true })

export default UserEntity;


