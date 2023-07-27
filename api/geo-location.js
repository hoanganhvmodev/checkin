import axios from "axios";

const apiLocation = {
  getLocation(params) {
    const url = `https://geocode.maps.co/reverse`;
    return axios.get(url, { params: { lat: params.lat, lon: params.lng } });
  },
};

export default apiLocation;
