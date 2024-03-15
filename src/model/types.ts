export enum Direction {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
}

export type Vector = { direction: Direction; length: number }

export type Position = { x: number; y: number }
