import axios from "axios";
type HttpMethod = "POST" | "GET" | "PUT" | "DELETE";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default async function request(
  path: string,
  method: HttpMethod,
  data?: object,
  formData?: FormData
) {

  console.log('base url', BASE_URL)
  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  if (formData) {
    const response = await axios.post(
      `${BASE_URL}/api${path}`,
      formData,
      config
    );
    return response.data;
  }

  if (method == "GET") {
    const response = await axios.get(`${BASE_URL}/api${path}`, {
      params: data,
      ...config,
    });
    return response.data;
  }

  const response = await axios.post(`${BASE_URL}/api${path}`, data, config);
  return response.data;
}
