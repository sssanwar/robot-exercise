import { App } from '../src/app'
import { AppError } from '../src/common/error'
import { log } from '../src/common/utils'

let executeThrowFlag = false
const appError = new AppError('some error')

const mockExecute = jest.fn().mockImplementation(() => {
  if (executeThrowFlag) throw appError
})

jest.mock('../src/model/command', () => ({
  ...jest.requireActual('../src/model/command'),
  CommandBuilder: () => ({ build: () => ({ execute: mockExecute }) }),
}))

jest.mock('../src/common/utils')

describe('App', () => {
  const app = new App({
    width: 5,
    height: 5,
    robot: { id: 'robot', initialPosition: { x: 1, y: 1 } },
    crates: [{ id: 'crate', initialPosition: { x: 2, y: 2 } }],
  })

  it('executes robot command', () => {
    app.sendCommand('N')
    expect(mockExecute).toHaveBeenCalled()
  })

  it('logs execution error', () => {
    executeThrowFlag = true
    app.sendCommand('N')
    expect(mockExecute).toHaveBeenCalled()
    expect(log).toHaveBeenCalledWith(appError)
  })
})
