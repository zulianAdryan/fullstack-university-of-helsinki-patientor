import { useParams } from "react-router-dom";
import {
  Diagnosis,
  EntriesTypes,
  Entry,
  FormNewEntryValues,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  PatientEntry,
} from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AddEntries from "../AddEntries";
import { useState } from "react";
import { Button } from "@mui/material";
import patientServices from "../../services/patients";

interface Props {
  patients: PatientEntry[];
  diagnoses: Diagnosis[];
  updateEntry: (id: string, newEntry: Entry) => void;
}

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div>
      <div
        style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
      >
        <p>{entry.date}</p>
        <MonitorHeartIcon />
      </div>
      <p>{entry.description}</p>
      <p>{`Diagnose by ${entry.specialist}`}</p>
    </div>
  );
};

const Hospital: React.FC<{ entry: HospitalEntry; diagnoses: Diagnosis[] }> = ({
  entry,
  diagnoses,
}) => {
  return (
    <div>
      <div
        style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
      >
        <p>{entry.date}</p>
        <LocalHospitalIcon />
      </div>
      <p>{entry.description}</p>
      {entry.diagnosisCodes
        ? entry.diagnosisCodes.map((code, index) => (
            <ul key={index}>
              <li>
                {code}{" "}
                {diagnoses.find(({ code: _code }) => _code === code)?.name}
              </li>
            </ul>
          ))
        : null}
      <p>{`Diagnose by ${entry.specialist}`}</p>
    </div>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  return (
    <div>
      <div
        style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
      >
        <p>{entry.date}</p>
        <DirectionsRunIcon />
      </div>
      <p>Employer name: {entry.employerName}</p>
      <p>{entry.description}</p>
      {entry.diagnosisCodes
        ? entry.diagnosisCodes.map((code, index) => (
            <ul key={index}>
              <li>
                {code}{" "}
                {diagnoses.find(({ code: _code }) => _code === code)?.name}
              </li>
            </ul>
          ))
        : null}
      <p>{`Diagnose by ${entry.specialist}`}</p>
    </div>
  );
};

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    default:
      break;
  }
};

const Patient = ({ patients, diagnoses, updateEntry }: Props) => {
  const { id } = useParams();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [type, setType] = useState<EntriesTypes>("HealthCheck");
  const patient: PatientEntry | undefined = patients.find(
    (p: PatientEntry) => p.id === id
  );

  const handleToggle = (_type: EntriesTypes) => {
    setType(_type);
    setShowForm((current) => !current);
  };

  const handleSubmit = async (formData: FormNewEntryValues) => {
    // console.log("FORM DATA", formData);
    if (typeof id === "string") {
      const newEntry = await patientServices.newEntries({
        id,
        params: formData,
      });
      updateEntry(id, newEntry);
    }
  };

  if (!patient) {
    return <p>Something wrong happened</p>;
  }

  return (
    <div>
      <div
        style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
      >
        <h1>{patient.name}</h1>
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : patient.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <HelpOutlineIcon />
        )}
      </div>
      <div style={{ marginBlock: "20px" }}>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>

      {showForm ? (
        <div style={{ padding: "20px", border: "1px solid black" }}>
          <AddEntries
            type={type}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="button"
            onClick={() => handleToggle("HealthCheck")}
            variant="contained"
            color="primary"
          >
            New Health Check
          </Button>
          <Button
            type="button"
            onClick={() => handleToggle("Hospital")}
            variant="contained"
            color="primary"
          >
            New Hospital
          </Button>
          <Button
            type="button"
            onClick={() => handleToggle("OccupationalHealthcare")}
            variant="contained"
            color="primary"
          >
            New OccupationalHealthcare
          </Button>
        </div>
      )}

      {patient.entries.length ? (
        <>
          <h2 style={{ marginBlock: "10px" }}>Entries</h2>
          {patient.entries.map((entry, index) => (
            <div
              key={index}
              style={{
                padding: "30px",
                marginBottom: "10px",
                border: "1px solid black",
              }}
            >
              <EntryDetails entry={entry} diagnoses={diagnoses} />
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};
export default Patient;
