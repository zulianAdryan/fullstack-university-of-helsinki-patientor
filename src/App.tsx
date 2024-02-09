import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";
import { apiBaseUrl } from "./constants";
import { Diagnosis, Entry, PatientEntry } from "./types";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import Patient from "./components/Patient";
import diagnoseService from "./services/diagnose";

const App = () => {
  const [patients, setPatients] = useState<PatientEntry[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const _patients = await patientService.getAll();
      setPatients(_patients);
    };

    const fetchDiagnoses = async () => {
      const _diagnoses = await diagnoseService.getAll();
      setDiagnoses(_diagnoses);
    };
    void fetchPatientList();
    void fetchDiagnoses();
  }, []);

  const handleUpdateEntry = (id: string, newEntry: Entry) => {
    // console.log({ id, newEntry });
    setPatients((current) =>
      current.map((patient) =>
        patient.id === id
          ? { ...patient, entries: patient.entries.concat(newEntry) }
          : patient
      )
    );
  };

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/:id"
              element={
                <Patient
                  patients={patients}
                  diagnoses={diagnoses}
                  updateEntry={handleUpdateEntry}
                />
              }
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
