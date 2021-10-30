import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  console.log('id request');
  const id = req.params.id;
  const patient = patientService.getPatientById(id);
  if (patient) {
    return res.json(patient);
  } else {
    return res.status(404).send('Patient with given id was not found');
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const patientId = req.params.id;
  try {
    const newMedicalEntry = toNewEntry(req.body);

    const updatedPatient = patientService.addEntry(newMedicalEntry, patientId);
    res.json(updatedPatient);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.delete('/:id/entries/:entryId', (req, res) => {
  const patientId = req.params.id;
  const entryId = req.params.entryId;
  try {
    patientService.deleteEntry(patientId, entryId);
    res.status(204).end(); // no content returned for successful req
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});


export default router;