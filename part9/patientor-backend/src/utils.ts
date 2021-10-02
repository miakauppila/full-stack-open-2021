import { Gender, PatientWithoutId, EntryType, EntryWithoutId, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseStringValue = (value: unknown, field: string): string => {
    if (!value || !isString(value)) {
        throw new Error(`Incorrect or missing ${field}`);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEnumType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};


const isCorrectType = (type: unknown): EntryType => {
    if (!type || !isString(type)) {
        throw new Error('Incorrect or missing type');
    }
    if (!isEnumType(type)) {
        throw new Error('Incorrect type: ' + type);
    }
    return type;
};

// const parseEntries = (entries: unknown): Entry[] => {
//     if (!entries || !Array.isArray(entries)) {
//         throw new Error('Incorrect or missing entries: ' + entries);
//     }
//     entries.map((entry) => {
//         isCorrectType(entry.type);
//     });
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//     return entries;
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parsehealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health check rating: ' + rating);
    }
    return rating;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
        if (!Array.isArray(codes)) {
            throw new Error('Incorrect diagnosis codes: ' + codes);
        }
        const checked = codes.map((code) =>
            parseStringValue(code, 'diagnosis code')
        );
        return checked;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any): PatientWithoutId => {
    const newPatient = {
        name: parseStringValue(object.name, 'name'),
        ssn: parseStringValue(object.ssn, 'social security number'),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseStringValue(object.occupation, 'occupation'),
        entries: []
    };
    return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): EntryWithoutId => {

    const isBaseEntry = {
        description: parseStringValue(object.description, 'description'),
        date: parseDate(object.date),
        specialist: parseStringValue(object.specialist, 'specialist'),
        type: isCorrectType(object.type),
        diagnosisCodes: object.diagnosisCodes? parseDiagnosisCodes(object.diagnosisCodes) : undefined
    };

    switch (object.type) {
        case 'Hospital':
            let entry: EntryWithoutId = {
                ...isBaseEntry,
                type: EntryType.Hospital,
            };
            return entry;
        case 'OccupationalHealthcare':
            entry = {
                ...isBaseEntry,
                type: EntryType.OccupationalHealthcare,
                employerName: parseStringValue(object.employerName, ' employer name')
            };
            return entry;
        case 'HealthCheck':
            entry = {
                ...isBaseEntry,
                type: EntryType.HealthCheck,
                healthCheckRating: parsehealthCheckRating(object.healthCheckRating)
            };
            return entry;
        default:
            throw new Error(
                `Unhandled type: ${JSON.stringify(object.type)}`
            );
    }

};