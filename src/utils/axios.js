import axios from "axios";

const service = axios.create({
  baseURL: "/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjE4NTM2MzMyODJAcXEuY29tIiwiZXhwIjoxNjUxNjQ5MTk3LCJpYXQiOjE2NTAzNTMxOTcsImlkIjoxLCJyb2xlIjoyMCwidXNlcm5hbWUiOiJ3emwifQ.INgj-duGn9Q_nU7Xki06dmEjVuv0yOxaX0WBfBM8PZY",
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // config.headers.Authorization = "token";
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // if (window.$message) window.$message.success(response.X-Token);
    console.log(response);
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    window.$message.error(error.message);
    return Promise.reject(error);
  }
);

export default service;
