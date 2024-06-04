import { getLoginUser } from '~/server/utils/ServletUtil'

export default defineEventHandler(async (event) => {
  const { user } = await getLoginUser(event)

  if (!user)
    throw createError({ statusCode: 404, statusMessage: '用户不存在' })
  return user
})
