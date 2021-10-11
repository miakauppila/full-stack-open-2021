import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "SET_PATIENT_FULL_DATA";
    payload: Patient;
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: {
      patientEntries: Entry[], 
      id: string
    };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT_FULL_DATA":
      return {
        ...state,
        patientsFullData: {
          ...state.patientsFullData,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const id = action.payload.id;
      const patient = state.patientsFullData[id];
      patient.entries = action.payload.patientEntries;
      console.log('new Arr', patient.entries);
      return {
        ...state,
        patientsFullData: {
          ...state.patientsFullData,
          [id]: patient 
        }
      };
    default:
      return state;
  }
};



export const setPatientListAction = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const setPatientFullDataAction = (patientFromApi: Patient): Action => {
  return {
    type: "SET_PATIENT_FULL_DATA",
    payload: patientFromApi
  };
};

export const addPatientAction = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const setDiagnosesAction = (diagnosesListFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosesListFromApi
  };
};

export const addEntryAction = (patientEntries: Entry[], id: string): Action => {
  console.log('addEntryAction');
  return {
    type: "ADD_ENTRY",
    payload: {
      patientEntries, 
      id
    }
  };
};