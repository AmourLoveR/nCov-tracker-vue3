// 封装日期格式化函数
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  const weekArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
    week: weekArr[date.getDay()]
  }
  for (const key in config) {
    format = format.replace(key, config[key])
  }
  return format
}