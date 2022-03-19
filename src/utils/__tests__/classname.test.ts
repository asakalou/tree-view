import { classname } from '../classname'

describe('classname', () => {
  test.each([
    [[undefined], undefined],
    [['hello'], 'hello'],
    [['hello', 'world'], 'hello world'],
    [['hello', undefined, 'world'], 'hello world'],
    [[undefined, 'hello', undefined, 'world'], 'hello world'],
  ])(`FOR %o returns %s`, (classes, expected) => {
    expect(classname(...classes)).toBe(expected)
  })
})
