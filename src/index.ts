import readline from 'readline'
import { App } from './app'
import { CloseHandler, LineHandler, init } from './init'

const app = new App({
  width: 10,
  height: 10,
  robot: { id: 'robot', initialPosition: { x: 0, y: 0 } },
  crates: [
    { id: 'crate-1', initialPosition: { x: 4, y: 4 } },
    { id: 'crate-2', initialPosition: { x: 9, y: 9 } },
  ],
})

const read = readline.createInterface({ input: process.stdin })

init(read, LineHandler({ app, read }), CloseHandler({ exit: process.exit }))
