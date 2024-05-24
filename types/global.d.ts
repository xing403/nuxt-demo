
export interface ResponseEntity<T> {
  data?: T
  code: number
  message: string
}
