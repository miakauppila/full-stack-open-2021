import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientData, PatientWithoutId, EntryWithoutId } from '../types';
import { v4 as uuidv4 } from 'uuid';

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

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entryObj: PatientWithoutId): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entryObj
  };

  patients.push(newPatientEntry);
  console.log('patientService ready', newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entryObj: EntryWithoutId, patientId: string): Patient => {
  const newEntry = {
    id: uuidv4(),
    ...entryObj
  };

  const foundPatient = patients.find(patient => patient.id === patientId);
  if(!foundPatient) {
    throw new Error('Patient with given Id not found');
  }
  foundPatient.entries.push(newEntry);
  console.log('entryService ready', foundPatient);
  return foundPatient;
};


const deleteEntry = (patientId: string, entryId: string): null => {
  const foundPatient = patients.find(patient => patient.id === patientId);
  if(!foundPatient) {
    throw new Error('Patient with given Id not found');
  }
  foundPatient.entries = foundPatient.entries.filter((entry) => entry.id !== entryId);
  console.log('deleteService ready', foundPatient);
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatientById,
  addPatient,
  addEntry,
  deleteEntry
};