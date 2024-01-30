import axios from "axios";

const axiosFetch = axios.create({ baseURL: "http://localhost:5100/api/v1/" });

export default axiosFetch;
