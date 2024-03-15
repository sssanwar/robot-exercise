import { log } from './common/utils'
import { CommandBuilder } from './model/command'
import { Robot } from './model/robot'
import { Position } from './model/types'
import { Warehouse } from './model/warehouse'

type AppProps = {
  width: number
  height: number
  robot: {
    id: string
    initialPosition: Position
  }
}

export class App {
  #warehouse: Warehouse
  #robot: Robot
  #commandBuilder: ReturnType<typeof CommandBuilder>

  constructor(props: AppProps) {
    this.#warehouse = new Warehouse(props.width, props.height)
    this.#robot = new Robot(props.robot.id, this.#warehouse, props.robot.initialPosition)
    this.#commandBuilder = CommandBuilder(this.#robot)
  }

  sendCommand(key: string) {
    try {
      this.#commandBuilder.build(key).execute()
    } catch (e: any) {
      log(e)
    }
  }
}
