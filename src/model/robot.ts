import { Position, Vector } from './types'
import { Occupier, Warehouse } from './warehouse'
import { AppError } from '../common/error'
import { log } from '../common/utils'

export class Robot extends Occupier {
  constructor(
    readonly id: string,
    readonly warehouse: Warehouse,
    initialPosition: Position,
  ) {
    super(id)
    this.warehouse.addPlacement(this, initialPosition)
    log({ msg: `Robot (id: ${this.id}) created`, initialPosition })
  }

  move(vector: Vector) {
    const placement = this.warehouse.getPlacementById(this.id)
    if (!placement) throw new AppError('Robot has not been placed!')

    const projected = this.warehouse.getProjectedPosition(placement.position, vector)
    this.warehouse.addPlacement(this, projected, false)
    log({ msg: `Robot (id: ${this.id}) moved!`, position: projected })
  }
}
