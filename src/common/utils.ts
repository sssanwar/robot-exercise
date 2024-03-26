import { AppError } from './error'

export const log = (obj: any, data?: object) => {
  const args =
    obj instanceof AppError
      ? { msg: obj.message, ...obj.data, ...data }
      : typeof obj === 'string'
        ? { msg: obj, ...data }
        : obj

  console.log(args)
}

export const parseInputLine = (line: string) => {
  const cleaned = line.replace(/\s/g, '').toUpperCase()
  return cleaned === 'EXIT' ? undefined : cleaned.split('')
}
