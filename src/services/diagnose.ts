import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getAll = async () => {
  const response = await axios.get(`${apiBaseUrl}/diagnoses`);
  return response.data as Diagnosis[];
};
export default { getAll };
