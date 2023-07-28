import axiosInstance from "./axios-instance";

const apiAttendences = {
  getAttendencesManagementForAdmin() {
    const url = "/admin/attendances";
    return axiosInstance.get(url);
  },
  getAttendencesUser() {
    const url = "/user/checkins";
    return axiosInstance.get(url);
  },
};

export default apiAttendences;
