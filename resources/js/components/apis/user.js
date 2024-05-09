import api from "./api";

export default {
  register(form) {
    return api().post("/api/register", form);
  },

  login(form) {
    return api().post("/api/login", form);
  },

  logout() {
    return api().post("/api/logout");
  },

  auth() {
    return api().get("/api/user");
  }
};