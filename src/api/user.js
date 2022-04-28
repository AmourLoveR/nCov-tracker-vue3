import service from "../utils/axios";

export function userRegister(data) {
  return service.request({
    method: "post",
    url: "/user/register",
    data,
  });
}

export function userLogin(data) {
  return service.request({
    method: "post",
    url: "/user/login",
    data,
  });
}

export function userRegisters() {
  return service.request({
    method: "get",
    url: "/user/registers",
  });
}
