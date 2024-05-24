import { describe, it } from 'vitest'
import db from '..'

describe.concurrent('database', () => {
  it('database connect', async ({ expect }) => {
    expect(db.instance).toBeTruthy()
  })
})
