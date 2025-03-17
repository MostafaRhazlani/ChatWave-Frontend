import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    userRole: localStorage.getItem("role") || "",
    user: JSON.parse(localStorage.getItem("user")) || []
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
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout() {
      this.token = ""; 
      this.userRole = ""; 
      this.user = ""; 
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
  },
});
