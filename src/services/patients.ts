import axios from "axios";
import {
  Entry,
  FormNewEntryValues,
  PatientEntry,
  PatientFormValues,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<PatientEntry[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<PatientEntry>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const newEntries = async ({
  id,
  params,
}: {
  id: string;
  params: FormNewEntryValues;
}) => {
  const response = await axios.post(
    `${apiBaseUrl}/patients/${id}/entries`,
    params
  );
  return response.data as Entry;
};

export default {
  getAll,
  create,
  newEntries,
};
