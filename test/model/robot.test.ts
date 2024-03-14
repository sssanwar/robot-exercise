import { Robot } from '../../src/model/robot'
import { Direction } from '../../src/model/types'
import { Warehouse } from '../../src/model/warehouse'

describe('Robot', () => {
  const warehouse = new Warehouse(10, 10)
  const robot = new Robot('robot', warehouse, { x: 0, y: 0 })

  it('moves robot to new position', () => {
    robot.move({ direction: Direction.North, length: 1 })
    const placement = warehouse.getPlacementById(robot.id)
    expect(placement?.position).toEqual({ x: 0, y: 1 })
  })

  it('throws when moving a robot with no placement', () => {
    warehouse.removePlacement(robot)
    expect(() => robot.move({ direction: Direction.North, length: 1 })).toThrow('Robot has not been placed!')
  })
})
