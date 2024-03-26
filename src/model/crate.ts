import { Position } from './types'
import { Occupier, Warehouse } from './warehouse'
import { log } from '../common/utils'

export class Crate extends Occupier {
  constructor(
    readonly id: string,
    readonly warehouse: Warehouse,
    initialPosition: Position,
  ) {
    super(id)
    warehouse.addPlacement(this, initialPosition)
    log(`Crate (${this.id}) created!`, { position: initialPosition })
  }
}
