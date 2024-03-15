import { AppError } from './error'

export const log = (obj: any) => {
  const args =
    obj instanceof AppError ? { msg: obj.message, ...obj.data } : typeof obj === 'string' ? { msg: obj } : obj

  console.log(args)
}

export const parseInputLine = (line: string) => {
  const cleaned = line.replace(/\s/g, '').toUpperCase()
  return cleaned === 'EXIT' ? undefined : cleaned.split('')
}
