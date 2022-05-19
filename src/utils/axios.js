import axios from "axios";
import { decodeToken } from "../utils/utils";

const service = axios.create({
  baseURL: "http://myhost.fallen-angle.com:8081/api/v1",
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("token");
    config.headers.Token = token;
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
    if (response.headers["x-token"]) {
      const token = response.headers["x-token"];
      localStorage.setItem("token", token);
      // const user = decodeToken(token);
      // userStore.setUserinfo(user);
    } else if (response.headers["x-token"] == "") {
      location.hash = "login";
    }

    return response;
  },
  function (error) {
    // 对响应错误做点什么
    if (window.$message) window.$message.error(error.message);
    // console.log(error.response);
    // return Promise.reject(error);
    return error
  }
);

export default service;
