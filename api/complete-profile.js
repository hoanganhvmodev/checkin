import axiosInstance from "./axios-instance";

const apiCompleteProfile = {
  getDepartMent() {
    const url = `/departments`;
    return axiosInstance.get(url);
  },

  updateProfile(data) {
    const url = `/auth/complete_profie`;
    return axiosInstance.put(url, data);
  },
};

export default apiCompleteProfile;
