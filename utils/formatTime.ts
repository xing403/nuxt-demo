import dayjs from "dayjs"

export default (date?: string | number | Date, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format)
}
