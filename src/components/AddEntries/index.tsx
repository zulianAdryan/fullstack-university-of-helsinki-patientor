import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  EntriesTypes,
  FormNewEntryValues,
  FormValuesHealthCheckEntry,
  FormValuesHospitalEntry,
  FormValuesOccupationalHealthcareEntry,
  HealthCheckRating,
} from "../../types";
import { useState } from "react";

interface FormProps {
  onSubmit: (formData: FormNewEntryValues) => void;
  onCancel: () => void;
}

interface Props extends FormProps {
  type: EntriesTypes;
}

const FormHealthCheck: React.FC<FormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FormValuesHealthCheckEntry>({
    date: "",
    description: "",
    specialist: "",
    diagnosisCodes: [],
    type: "HealthCheck",
    healthCheckRating: 0,
  });
  const healthCheckRatingOptions = Object.entries(HealthCheckRating)
    .filter(([key, _]) => isNaN(Number(key)))
    .map(([label, value]) => ({ label, value }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((current) => ({
      ...current,
      [name]:
        name === "diagnosisCodes" ? value.replace(" ", "").split(",") : value,
    }));
  };

  const handleSelect = (event: SelectChangeEvent<HealthCheckRating>) => {
    const { value, name } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.log("form data", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Health Check Entry</h2>
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date"
        type="date"
        variant="outlined"
        name="date"
        value={formData.date}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Specialist"
        variant="outlined"
        name="specialist"
        value={formData.specialist}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="healthCheckRating">Health Check Rating</InputLabel>
        <Select
          labelId="healthCheckRating"
          id="healthCheckRating"
          name="healthCheckRating"
          value={formData.healthCheckRating}
          onChange={handleSelect}
          label="Health Check Rating"
        >
          {healthCheckRatingOptions.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Diagnosis Codes"
        variant="outlined"
        name="diagnosisCodes"
        value={formData.diagnosisCodes}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "30px 0px 10px 0px",
        }}
      >
        <Button
          type="button"
          variant="outlined"
          color="error"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          ADD
        </Button>
      </div>
    </form>
  );
};

const FormHospital: React.FC<FormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FormValuesHospitalEntry>({
    date: "",
    description: "",
    specialist: "",
    diagnosisCodes: [],
    type: "Hospital",
    discharge: {
      date: "",
      criteria: "",
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((current) => {
      if (name.includes("discharge")) {
        return {
          ...current,
          discharge: {
            ...current.discharge,
            [name.replace("discharge.", "")]: value,
          },
        };
      } else {
        return {
          ...current,
          [name]:
            name === "diagnosisCodes"
              ? value.replace(" ", "").split(",")
              : value,
        };
      }
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.log("form data", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Hospital Entry</h2>
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date"
        type="date"
        variant="outlined"
        name="date"
        value={formData.date}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Specialist"
        variant="outlined"
        name="specialist"
        value={formData.specialist}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Diagnosis Codes"
        variant="outlined"
        name="diagnosisCodes"
        value={formData.diagnosisCodes}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <InputLabel style={{ marginTop: "20px" }}>Discharge</InputLabel>
      <div style={{ padding: "20px" }}>
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          name="discharge.date"
          value={formData.discharge.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Criteria"
          variant="outlined"
          name="discharge.criteria"
          value={formData.discharge.criteria}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "30px 0px 10px 0px",
        }}
      >
        <Button
          type="button"
          variant="outlined"
          color="error"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          ADD
        </Button>
      </div>
    </form>
  );
};

const OccupationalHealthcare: React.FC<FormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] =
    useState<FormValuesOccupationalHealthcareEntry>({
      date: "",
      description: "",
      specialist: "",
      employerName: "",
      diagnosisCodes: [],
      type: "OccupationalHealthcare",
      sickLeave: {
        startDate: "",
        endDate: "",
      },
    });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((current) => {
      if (name.includes("sickLeave")) {
        return {
          ...current,
          sickLeave: {
            ...current.sickLeave,
            [name.replace("sickLeave.", "")]: value,
          },
        };
      } else {
        return {
          ...current,
          [name]:
            name === "diagnosisCodes"
              ? value.replace(" ", "").split(",")
              : value,
        };
      }
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.log("form data", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Occupational Health Care Entry</h2>
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date"
        type="date"
        variant="outlined"
        name="date"
        value={formData.date}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Specialist"
        variant="outlined"
        name="specialist"
        value={formData.specialist}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Diagnosis Codes"
        variant="outlined"
        name="diagnosisCodes"
        value={formData.diagnosisCodes}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <InputLabel style={{ marginTop: "20px" }}>Sick Leave</InputLabel>
      <div style={{ padding: "20px" }}>
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          name="sickLeave.startDate"
          value={formData.sickLeave.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          variant="outlined"
          name="sickLeave.endDate"
          value={formData.sickLeave.endDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "30px 0px 10px 0px",
        }}
      >
        <Button
          type="button"
          variant="outlined"
          color="error"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          ADD
        </Button>
      </div>
    </form>
  );
};

const AddEntries: React.FC<Props> = ({ type, onSubmit, onCancel }) => {
  switch (type) {
    case "HealthCheck":
      return <FormHealthCheck onSubmit={onSubmit} onCancel={onCancel} />;
    case "Hospital":
      return <FormHospital onSubmit={onSubmit} onCancel={onCancel} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare onSubmit={onSubmit} onCancel={onCancel} />;
    default:
      break;
  }

  return <p>Currently, adding new entries is not available</p>;
};

export default AddEntries;
