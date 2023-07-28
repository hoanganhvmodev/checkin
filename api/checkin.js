import axiosInstance from "./axios-instance";

const apiCheckIn = {
  checkIn(payload) {
    const url = `/checkin`;
    return axiosInstance.post(url, payload);
  },
};

export default apiCheckIn;
