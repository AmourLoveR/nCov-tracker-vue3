// 日期格式化函数
export function formatDate(date, format = "YYYY-MM-DD HH:mm:ss") {
  const weekArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
    week: weekArr[date.getDay()],
  };
  for (const key in config) {
    format = format.replace(key, config[key]);
  }
  return format;
}

// 获取地区数据
export function getRegionOptions() {
  const regions = [
    {
      label: "江苏",
      value: "江苏",
      disabled: false,
      children: [
        {
          label: "南京",
          value: "南京",
          parent: "江苏",
        },
        {
          label: "常州",
          value: "常州",
          parent: "江苏",
        },
        {
          label: "淮安",
          value: "淮安",
          parent: "江苏",
        },
        {
          label: "连云港",
          value: "连云港",
          parent: "江苏",
        },
        {
          label: "南通",
          value: "南通",
          parent: "江苏",
        },
        {
          label: "宿迁",
          value: "宿迁",
          parent: "江苏",
        },
        {
          label: "苏州",
          value: "苏州",
          parent: "江苏",
        },
        {
          label: "泰州",
          value: "泰州",
          parent: "江苏",
        },
        {
          label: "无锡",
          value: "无锡",
          parent: "江苏",
        },
        {
          label: "徐州",
          value: "徐州",
          parent: "江苏",
        },
        {
          label: "盐城",
          value: "盐城",
          parent: "江苏",
        },
        {
          label: "扬州",
          value: "扬州",
          parent: "江苏",
        },
        {
          label: "镇江",
          value: "镇江",
          parent: "江苏",
        },
      ],
    },
  ];

  return regions;
}
