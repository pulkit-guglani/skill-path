import axios from "axios";
import { API_BASE_URL } from "./urls";

const APP_API = axios.create({
  baseURL: API_BASE_URL,
});

export { APP_API };
