import { Position, Direction, Vector } from './types'
import { AppError } from '../common/error'

export abstract class Occupier {
  constructor(readonly id: string) {}
}

export class Placement {
  constructor(
    readonly occupier: Occupier,
    readonly position: Position,
  ) {}
}

export class Warehouse {
  readonly #placements: Placement[] = []

  constructor(
    readonly width: number,
    readonly height: number,
  ) {}

  getPlacementByPosition(position: Position) {
    return this.#placements.find(p => p.position.x === position.x && p.position.y === position.y)
  }

  getPlacementById(id: string) {
    return this.#placements.find(p => p.occupier.id === id)
  }

  validatePosition(position: Position, checkExistingPlacement = true) {
    const isValidPosition = position.x < this.width && position.x >= 0 && position.y < this.height && position.y >= 0
    if (!isValidPosition) throw new AppError('Must stay within boundary!')

    if (checkExistingPlacement) {
      const existingPlacement = this.getPlacementByPosition(position)
      if (existingPlacement) throw new AppError('An existing placement exists!', { position })
    }
  }

  getProjectedPosition(position: Position, vector: Vector): Position {
    const sign = [Direction.South, Direction.West].indexOf(vector.direction) < 0 ? 1 : -1
    const axis = [Direction.North, Direction.South].indexOf(vector.direction) < 0 ? 'x' : 'y'
    return { ...position, [axis]: position[axis] + vector.length * sign }
  }

  addPlacement(occupier: Occupier, position: Position, checkExistingPlacement = true) {
    this.validatePosition(position, checkExistingPlacement)
    this.removePlacement(occupier)
    const placement = new Placement(occupier, position)
    this.#placements.push(placement)
  }

  removePlacement(occupier: Occupier) {
    const placement = this.getPlacementById(occupier.id)
    if (placement) {
      const index = this.#placements.indexOf(placement)
      this.#placements.splice(index, 1)
    }
  }
}
