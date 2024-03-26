import { log } from '../../src/common/utils'
import { Crate } from '../../src/model/crate'
import { Robot } from '../../src/model/robot'
import { Direction } from '../../src/model/types'
import { Warehouse } from '../../src/model/warehouse'

jest.mock('../../src/common/utils')

describe('Robot', () => {
  const setupRobot = () => {
    const warehouse = new Warehouse(10, 10)
    const robot = new Robot('robot', warehouse, { x: 0, y: 0 })
    return { warehouse, robot }
  }

  it('moves robot to new position', () => {
    const { warehouse, robot } = setupRobot()
    robot.move({ direction: Direction.North, length: 1 })
    const placement = warehouse.getPlacementById(robot.id)
    expect(placement?.position).toEqual({ x: 0, y: 1 })
  })

  it('throws when moving a robot with no placement', () => {
    const { warehouse, robot } = setupRobot()
    warehouse.removePlacement(robot)
    expect(() => robot.move({ direction: Direction.North, length: 1 })).toThrow('Robot has not been placed!')
  })

  it('logs message when trying to unavailable crate', () => {
    const { robot } = setupRobot()
    robot.grab()
    expect(log).toHaveBeenLastCalledWith('There is no crate here!', { position: { x: 0, y: 0 } })
  })

  describe('Grab', () => {
    it('can grab a crate', () => {
      const { robot, warehouse } = setupRobot()
      new Crate('crate-1', warehouse, { x: 0, y: 0 })
      robot.grab()

      expect(log).toHaveBeenLastCalledWith('Crate (crate-1) picked up!', { position: { x: 0, y: 0 } })
    })

    it('logs message when trying to drop while not carrying', () => {
      const { robot } = setupRobot()
      robot.drop()

      expect(log).toHaveBeenLastCalledWith('Robot is not carrying a crate!')
    })

    it('logs message when trying to grab while carrying another', () => {
      const { robot, warehouse } = setupRobot()
      new Crate('crate-1', warehouse, { x: 0, y: 0 })
      new Crate('crate-2', warehouse, { x: 0, y: 1 })
      robot.grab()
      robot.move({ direction: Direction.North, length: 1 })
      robot.grab()

      expect(log).toHaveBeenLastCalledWith('Robot is carrying another crate!')
    })
  })

  describe('Drop', () => {
    it('can drop a crate', () => {
      const { robot, warehouse } = setupRobot()
      new Crate('crate-1', warehouse, { x: 0, y: 0 })

      robot.grab()
      robot.move({ direction: Direction.North, length: 1 })
      robot.drop()

      expect(log).toHaveBeenLastCalledWith('Crate (crate-1) dropped!', { position: { x: 0, y: 1 } })
    })

    it('logs message when trying to drop crate at a position with existing crate', () => {
      const { robot, warehouse } = setupRobot()
      new Crate('crate-1', warehouse, { x: 0, y: 0 })
      new Crate('crate-2', warehouse, { x: 0, y: 1 })

      robot.grab()
      robot.move({ direction: Direction.North, length: 1 })
      robot.drop()

      expect(log).toHaveBeenLastCalledWith('There is already a crate (crate-2) here!', { position: { x: 0, y: 1 } })
    })
  })
})
