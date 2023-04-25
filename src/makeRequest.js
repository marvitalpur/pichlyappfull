import axios from 'axios';

// const BASE_URL = 'http://10.0.2.2:4000/api';
export const BASE_URL = 'http://192.168.100.136:4000/api';

// export const BASE_URL = 'http://192.168.100.33:4000/api';
// export const BASE_URL = 'http://192.168.100.33:4000/api';

// export const BASE_URL = 'https://pitchly1.herokuapp.com/api';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});
export const userRequest = async (method, url, formData, data, token) => {
  let config = {};
  if (token) {
    config = {
      token: `Bearer ${token}`,
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
    };
  } else {
    config = {
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
    };
  }
  if (data) {
    const response = await axios({
      method: method,
      url: BASE_URL + url,
      headers: config,
      data: data,
    });
    return response;
  } else {
    const response = await axios({
      method: method,
      url: BASE_URL + url,
      headers: config,
      data: formData,
      onUploadProgress: function (progressEvent) {
        const percentComplete = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100,
        );
        console.log('complete', percentComplete);
        // Do whatever you want with the native progress event
      },
    });
    return response;
  }
};
