import { describe, it } from 'vitest'
import db from '../'
import { useFetch } from '@vueuse/core'


describe.concurrent('database', () => {
  it('database connect', async ({ expect }) => {
    expect(db.instance).toBeTruthy()
  })
  it('post find all', async ({ expect }) => {
    const data = await useFetch('/api/posts/list')
    expect(data).toMatchSnapshot()
  })
})
