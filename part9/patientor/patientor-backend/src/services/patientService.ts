import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = { id, ...patient };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient };
