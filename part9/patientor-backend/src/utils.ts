import { Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing name');
    }
    return value;
};

const parseSsn = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing social security number');
    }
    return value;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth: ' + date);
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing occupation');
    }

    return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatient => {
    const newEntry: NewPatient = {
        name: parseName(object.name),
        ssn: parseSsn(object.ssn),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
    return newEntry;
};

export default toNewPatientEntry;