import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatient } from '../types';
import {v4 as uuidv4} from 'uuid';

const patients: Array<Patient> = patientsData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id : string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = ( entryObj: NewPatient ): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entryObj
  };

  patients.push(newPatientEntry);
  console.log('patientService ready', newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatientById,
  addPatient
};