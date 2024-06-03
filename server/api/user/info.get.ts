import tokenUtil from '~/server/utils/token'
import userModel from '~/server/database/modules/UserEntity'

export default defineEventHandler(async (event) => {
  const header = getRequestHeaders(event)

  if (!header['authorization'])
    throw createError({ statusCode: 403, statusMessage: '无权限' })
  const tokenInfo = await tokenUtil.verifyToken(header['authorization'])

  const user = await userModel.findByPk(tokenInfo.userId)
  if (!user)
    throw createError({ statusCode: 404, statusMessage: '用户不存在' })
  return user
})
