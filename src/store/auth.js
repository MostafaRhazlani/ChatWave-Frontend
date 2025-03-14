import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    userRole: localStorage.getItem("role") || "",
    user: JSON.parse(sessionStorage.getItem("user")) || []
  }),

  actions: {
    setToken(token) {
      this.token = token; 
      localStorage.setItem("token", token);
    },

    setRole(role) {
      this.userRole = role; 
      localStorage.setItem("role", role);
    },

    setUser(user) {
      this.user = user; 
      sessionStorage.setItem("user", JSON.stringify(user));
    },

    logout() {
      this.token = ""; 
      this.userRole = ""; 
      this.user = ""; 
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      sessionStorage.removeItem("user");
    },
  },
});
