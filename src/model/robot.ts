import { Crate } from './crate'
import { Position, Vector } from './types'
import { Occupier, Warehouse } from './warehouse'
import { AppError } from '../common/error'
import { log } from '../common/utils'

export class Robot extends Occupier {
  crate?: Crate

  constructor(
    readonly id: string,
    readonly warehouse: Warehouse,
    initialPosition: Position,
  ) {
    super(id)
    this.warehouse.addPlacement(this, initialPosition)
    log({ msg: `Robot (id: ${this.id}) created`, initialPosition })
  }

  get position() {
    const placement = this.warehouse.getPlacementById(this.id)
    if (!placement) throw new AppError('Robot has not been placed!')
    return placement.position
  }

  private findCrateHere() {
    const placements = this.warehouse.getPlacementsByPosition(this.position).filter(p => p.occupier instanceof Crate)
    return placements.length ? (placements[0].occupier as Crate) : undefined
  }

  move(vector: Vector) {
    const projected = this.warehouse.getProjectedPosition(this.position, vector)
    this.warehouse.addPlacement(this, projected)
    log({ msg: `Robot (id: ${this.id}) moved!`, position: projected })
  }

  grab() {
    if (this.crate) return log(`Robot is carrying another crate!`)

    const crate = this.findCrateHere()
    if (!crate) return log('There is no crate here!', { position: this.position })

    this.warehouse.removePlacement(crate)
    this.crate = crate

    log(`Crate (${crate.id}) picked up!`, { position: this.position })
  }

  drop() {
    if (!this.crate) return log('Robot is not carrying a crate!')

    const existing = this.findCrateHere()
    if (existing) return log(`There is already a crate (${existing.id}) here!`, { position: this.position })

    const crate = this.crate
    this.warehouse.addPlacement(crate, this.position)
    this.crate = undefined

    log(`Crate (${crate.id}) dropped!`, { position: this.position })
  }
}
