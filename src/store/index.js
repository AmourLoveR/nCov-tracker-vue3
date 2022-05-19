import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      username: "no info",
      region: "no region",
      role: "no role",
    };
  },
  getters: {},
  actions: {
    setUserinfo(userinfo) {
      this.username = userinfo.username;
      this.region = userinfo.region;
      this.role = userinfo.role
    },
  },
});

export const useNotifyStore = defineStore("notify", {
  state: () => {
    return {
      count: 0,
    };
  },
  getters: {},
  actions: {
    setCount(count) {
      this.count = count
    },
  },
});

