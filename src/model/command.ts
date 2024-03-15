import { Robot } from './robot'
import { Direction } from './types'
import { log } from '../common/utils'

abstract class Command {
  constructor(
    readonly robot: Robot,
    readonly key: string,
  ) {}

  abstract execute(): void
}

class MoveNorthCommand extends Command {
  execute() {
    this.robot.move({ direction: Direction.North, length: 1 })
  }
}

class MoveEastCommand extends Command {
  execute() {
    this.robot.move({ direction: Direction.East, length: 1 })
  }
}

class MoveSouthCommand extends Command {
  execute() {
    this.robot.move({ direction: Direction.South, length: 1 })
  }
}

class MoveWestCommand extends Command {
  execute() {
    this.robot.move({ direction: Direction.West, length: 1 })
  }
}

class InvalidCommand extends Command {
  execute() {
    log(`Invalid command: ${this.key}`)
  }
}

export const CommandBuilder = (robot: Robot) => ({
  build: (key: string): Command => {
    switch (key) {
      case 'N':
        return new MoveNorthCommand(robot, key)
      case 'E':
        return new MoveEastCommand(robot, key)
      case 'S':
        return new MoveSouthCommand(robot, key)
      case 'W':
        return new MoveWestCommand(robot, key)
      default:
        return new InvalidCommand(robot, key)
    }
  },
})
