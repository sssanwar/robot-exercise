import { Robot } from '../../src/model/robot'
import { Direction } from '../../src/model/types'
import { Warehouse } from '../../src/model/warehouse'

describe('Warehouse', () => {
  const warehouse = new Warehouse(10, 10)
  new Robot('robot', warehouse, { x: 0, y: 0 })

  it('gets placement by position', () => {
    const placement = warehouse.getPlacementByPosition({ x: 0, y: 0 })
    expect(placement?.occupier.id).toEqual('robot')
    expect(placement?.position).toEqual({ x: 0, y: 0 })
  })

  it('gets placement by ID', () => {
    const placement = warehouse.getPlacementById('robot')
    expect(placement?.occupier.id).toEqual('robot')
    expect(placement?.position).toEqual({ x: 0, y: 0 })
  })

  it('verifies for valid position', () => {
    expect(() => warehouse.validatePosition({ x: -1, y: 0 })).toThrow('Must stay within boundary!')
    expect(() => warehouse.validatePosition({ x: 0, y: 0 })).toThrow('An existing placement exists!')
    expect(() => warehouse.validatePosition({ x: 0, y: 0 }, false)).not.toThrow()
  })

  it('returns correct projected position', () => {
    const initialPos = { x: 0, y: 0 }
    expect(warehouse.getProjectedPosition(initialPos, { direction: Direction.North, length: 2 })).toEqual({
      x: 0,
      y: 2,
    })

    expect(warehouse.getProjectedPosition(initialPos, { direction: Direction.East, length: 2 })).toEqual({
      x: 2,
      y: 0,
    })

    expect(warehouse.getProjectedPosition(initialPos, { direction: Direction.South, length: 2 })).toEqual({
      x: 0,
      y: -2,
    })

    expect(warehouse.getProjectedPosition(initialPos, { direction: Direction.West, length: 2 })).toEqual({
      x: -2,
      y: 0,
    })
  })
})
