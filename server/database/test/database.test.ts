import { describe, it } from 'vitest'
import DB from '../'

describe.concurrent('database', () => {
  it('database connect', async ({ expect }) => {
    expect(DB.instance).toBeTruthy()
  })
})
