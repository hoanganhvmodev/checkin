import axiosInstance from "./axios-instance";

const apiAuth = {
  login(payload) {
    const url = "/auth/google_login";
    return axiosInstance.post(url, payload);
  },
};

export default apiAuth;
