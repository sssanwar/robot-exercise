import { EventEmitter } from 'events'
import readline from 'readline'
import { App } from './app'
import { parseInputLine } from './common/utils'

export type LineHandlerProps = {
  app: App
  read: readline.Interface
}

export const LineHandler = (props: LineHandlerProps) => (line: string) => {
  const { app, read } = props
  const keys = parseInputLine(line)
  if (!keys) return read.close()

  keys.forEach(key => app.sendCommand(key))
  read.prompt()
}

export type CloseHandlerProps = {
  exit: (code: number) => void
}

export const CloseHandler = (props: CloseHandlerProps) => () => {
  console.log('Bye!')
  props.exit(0)
}

export const init = (
  event: EventEmitter,
  lineHandler: ReturnType<typeof LineHandler>,
  closeHandler: ReturnType<typeof CloseHandler>,
) => {
  event.on('line', lineHandler).on('close', closeHandler)
  console.log('\nType in your command and press ENTER.\n')
}
