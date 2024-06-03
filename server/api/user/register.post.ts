import { User } from "~/types/user"
import userModel from '../../database/modules/UserEntity'
import bcryptPassword from "~/server/utils/bcryptPassword"

export default defineEventHandler(async (event) => {
  const user = await readBody<User>(event)

  const findUser = await userModel.findOne({ where: { username: user.username, isDelete: '0' } })

  if (user.username === undefined || user.password === undefined)
    throw createError({ statusCode: 500, statusMessage: 'username/password 不存在' })
  if (user.username === '' || user.password === '')
    throw createError({ statusCode: 500, statusMessage: '用户名/密码不能为空' })

  if (findUser !== null)
    throw createError({ statusCode: 500, statusMessage: '用户名已存在' })

  const createUser = await userModel.create({
    username: user.username,
    password: bcryptPassword.encryptPassword(user.password),
  }, {
    fields: ['username', 'password']
  })
  if (createUser === null)
    throw createError({ statusCode: 500, statusMessage: '注册失败' })

  return {
    code: 200,
    message: '注册成功',
    data: createUser
  }
})
