export class AppError extends Error {
  constructor(
    readonly message: string,
    readonly data?: Record<string, any>,
  ) {
    super(message)
  }
}
