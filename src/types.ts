export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export type EntriesTypes =
  | "HealthCheck"
  | "Hospital"
  | "OccupationalHealthcare";

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalDischarge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: HospitalDischarge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface PatientEntry {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

type UnionOmitEntry<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type FormValuesHealthCheckEntry = UnionOmitEntry<HealthCheckEntry, "id">;
export type FormValuesHospitalEntry = UnionOmitEntry<HospitalEntry, "id">;
export type FormValuesOccupationalHealthcareEntry = UnionOmitEntry<
  OccupationalHealthcareEntry,
  "id"
>;

export type FormNewEntryValues =
  | FormValuesHealthCheckEntry
  | FormValuesHospitalEntry
  | FormValuesOccupationalHealthcareEntry;

export type PatientFormValues = Omit<PatientEntry, "id" | "entries">;
