import { EventEmitter } from 'stream'
import { mockDeep } from 'jest-mock-extended'
import { CloseHandler, CloseHandlerProps, LineHandler, LineHandlerProps, init } from '../src/init'

describe('init', () => {
  describe('LineHandler', () => {
    const props = mockDeep<LineHandlerProps>()

    it('parses line input and sends command', () => {
      const handler = LineHandler(props)

      handler('n e s w')
      expect(props.app.sendCommand).toHaveBeenCalledTimes(4)
      expect(props.read.prompt).toHaveBeenCalled()

      handler('exit')
      expect(props.read.close).toHaveBeenCalled()
    })
  })

  describe('CloseHandler', () => {
    const props = mockDeep<CloseHandlerProps>()

    it('calls process exit', () => {
      const handler = CloseHandler(props)
      handler()

      expect(props.exit).toHaveBeenCalled()
    })
  })

  describe('init', () => {
    const onLine = jest.fn()
    const onClose = jest.fn()

    it('invokes event handlers', () => {
      const event = new EventEmitter()
      init(event, onLine, onClose)

      event.emit('line', 'n e s w')
      expect(onLine).toHaveBeenCalledWith('n e s w')

      event.emit('close')
      expect(onClose).toHaveBeenCalled()
    })
  })
})
