import { defineStore } from "pinia";

export const useUserStore = defineStore("main", {
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
