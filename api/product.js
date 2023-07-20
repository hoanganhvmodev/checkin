import axiosInstance from "./axios-instance";

const apiProduct = {
  getListProduct() {
    const url = "/products";
    return axiosInstance.get(url);
  },
};

export default apiProduct;
