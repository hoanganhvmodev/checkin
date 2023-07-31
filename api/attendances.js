import axiosInstance from "./axios-instance";

const apiAttendences = {
  getAttendencesManagementForAdmin(params) {
    const url = "/admin/attendances";
    return axiosInstance.get(url, { params });
  },
  getAttendencesUser(params) {
    const url = "/user/checkins";
    return axiosInstance.get(url, { params });
  },
};

export default apiAttendences;
