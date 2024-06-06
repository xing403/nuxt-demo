import tokenUtil from '~/server/utils/token'
import userModel from '~/server/database/modules/UserEntity'

export const getLoginUser = defineEventHandler(async (event) => {
  const token = getCookie(event, 'authorization')

  if (!token)
    throw createError({ statusCode: 401, statusMessage: '未登录' })
  const tokenInfo = await tokenUtil.verifyToken(token)

  return {
    info: tokenInfo,
    user: await userModel.findByPk(tokenInfo.userId, {
      having: {
        'isDelete': '0'
      }
    })
  }
})
