import { AppError } from '../../src/common/error'
import { log, parseInputLine } from '../../src/common/utils'

describe('log', () => {
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {})

  it('logs AppError message and data', () => {
    log(new AppError('An error', { id: '123' }))
    expect(mockConsoleLog).toHaveBeenCalledWith({ msg: 'An error', id: '123' })
  })
})

describe('parseCommands', () => {
  it('returns keys', () => {
    const keys = parseInputLine('n e s w')
    expect(keys).toEqual(['N', 'E', 'S', 'W'])
  })

  it('returns undefined when input is exit', () => {
    const keys = parseInputLine('exit')
    expect(keys).toBeUndefined()
  })
})
