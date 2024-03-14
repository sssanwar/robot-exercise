import { CommandBuilder } from '../../src/model/command'
import { Robot } from '../../src/model/robot'
import { Direction } from '../../src/model/types'
import { Warehouse } from '../../src/model/warehouse'

jest.mock('../../src/model/robot')

describe('CommandBuilder', () => {
  const warehouse = new Warehouse(10, 10)
  const robot = new Robot('robot', warehouse, { x: 0, y: 0 })
  const commandBuilder = CommandBuilder(robot)

  it('moves robot to North when key is N', () => {
    commandBuilder.build('N').execute()
    expect(robot.move).toHaveBeenCalledWith({ direction: Direction.North, length: 1 })
  })

  it('moves robot to East when key is E', () => {
    commandBuilder.build('E').execute()
    expect(robot.move).toHaveBeenCalledWith({ direction: Direction.East, length: 1 })
  })

  it('moves robot to South when key is S', () => {
    commandBuilder.build('S').execute()
    expect(robot.move).toHaveBeenCalledWith({ direction: Direction.South, length: 1 })
  })

  it('moves robot to West when key is W', () => {
    commandBuilder.build('W').execute()
    expect(robot.move).toHaveBeenCalledWith({ direction: Direction.West, length: 1 })
  })

  it('does not move robot when key is not recognised', () => {
    commandBuilder.build('Z').execute()
    expect(robot.move).not.toHaveBeenCalled()
  })
})
