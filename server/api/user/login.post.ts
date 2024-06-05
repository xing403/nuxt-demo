import { User } from "~/types/user"
import userModel from '~/server/database/modules/UserEntity'
import bcryptPassword from '~/server/utils/bcryptPassword'
import tokenUtil from '~/server/utils/token'

export default defineEventHandler(async (event) => {
  const query = await readBody<User>(event)
  const user = await userModel.findOne({ where: { username: query.username, isDelete: '0' } })
  if (user === null)
    throw createError({ statusCode: 404, statusMessage: '未找到用户' })
  if (!bcryptPassword.comparePassword(query.password as string, user.password))
    throw createError({ statusCode: 500, statusMessage: '用户名或密码错误' })

  const token = tokenUtil.generateToken({ userId: user.userId, username: user.username, auth: user.auth })
  setCookie(event, 'token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'strict',
    secure: true,
  })
  return {
    code: 200,
    message: '登录成功',
    data: {
      token,
      username: user.username,
      id: user.userId
    }
  }
})
