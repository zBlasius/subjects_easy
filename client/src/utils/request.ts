import axios from "axios";

type HttpMethod = "POST" | "GET" | "PUT" | "DELETE";
export default async function request(path: string, method: HttpMethod, data?: object) {

    if (method == "GET") {
        const response = await axios.get(`http://localhost:8080${path}`, { params: data })
        return response.data;
    }

    const response = await axios.post(`http://localhost:8080${path}`, { data })
    return response.data;

}